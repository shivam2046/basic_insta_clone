const postModel = require('../models/post.model')
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")

const imagekit = new ImageKit({
    privatekey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createpostController(req, res) {
   
    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "tset",
        foldername: "instaclone"
    })

    const post = await postModel.create({
        caption: req.body.caption,
        imageurl: file.url,
        user: req.user.id
    })
    res.status(201).json({
        message: "post created successfully",
        post
    })
}

async function getpostController(req, res) {

    const userId=req.user.id

    const post = await postModel.find({
        user: userId
    })

    res.status(200).json({
        message: "ppost fetched successfully",
        post
    })

}

async function getpostdetailController(req, res) {

     const userId=req.user.id
    const postId=req.params.postId

    const post= await postModel.findById(postId)
    if(!post){
        return res.status(404).json({
            message:"post not found"
        })
    }
    const isvaliduser=post.user.toString()===userId
    if(!isvaliduser){
        return res.status(403).json({
            message:"forbidden content"
        })
    }

    return res.status(200).json({
        message:"post fetched successfully",
        post
    })



}



module.exports = {
    createpostController,
    getpostController,
    getpostdetailController
}