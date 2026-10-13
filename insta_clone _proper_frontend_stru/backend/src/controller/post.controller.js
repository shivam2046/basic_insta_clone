
const PostModel = require('../models/post.model')
const ImageKit = require('@imagekit/nodejs')
const { toFile } = require('@imagekit/nodejs')
const jwt = require('jsonwebtoken')

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createpostcontroller(req, res) {
    try {
        // 1. Get token from cookies
        const token = req.cookies.token

        if (!token) {
            return res.status(401).json({
                message: "Token not provided, Unauthorized access"
            })
        }

        // 2. Verify JWT token
        let decoded

        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET)
        } catch (err) {
            return res.status(401).json({
                message: "Unauthorized access"
            })
        }

        // 3. Check whether an image was uploaded
        if (!req.file) {
            return res.status(400).json({
                message: "Please upload an image"
            })
        }

        // 4. Upload image to ImageKit
        const uploadedFile = await imagekit.files.upload({
            file: await toFile(
                req.file.buffer,
                req.file.originalname
            ),
            fileName: req.file.originalname,
            folder: "instaclone"
        })

        // 5. Get caption from request body
        const { caption } = req.body

        // 6. Save post in MongoDB
        const post = await PostModel.create({
            caption: caption,
            imageURL: uploadedFile.url,
            user: decoded.id
        })

        // 7. Send response
        return res.status(201).json({
            message: "Post created successfully",
            post
        })

    } catch (err) {
        console.error("Create post error:", err)

        return res.status(500).json({
            message: "Failed to create post",
            error: err.message
        })
    }
}


async function getpost(req, res) {


    const userId = req.user.id

    const post = await PostModel.find({
        user: userId
    })
    if (!post) {
        return res.status(404).json({
            message: "Post not found"
        })
    }

    return res.status(200).json({
        message: "post fetched successfully",
        post
    })
}

async function getpostdetail(req, res) {

    const userId = req.user.id
    const postId = req.params.postId

    const post = await PostModel.findById(postId)
    if (!post) {
        return res.status(404).json({
            message: "post not found with this is id"
        })
    }

    const isvaliduser = post.user.toString() === userId
    if (!isvaliduser) {
        return res.status(200).json({
            message: "forbidden content"
        })
    }

    return res.status(200).json({
        message: "post fetched successfully",
        post
    })
}

async function getfeed(req,res) {
    const post= await PostModel.find().populate('user')

    res.status(200).json({
        message:"Post fetched successfully",
        post
    })
}

module.exports = {
    createpostcontroller,
    getpost,
    getpostdetail,
    getfeed
}
