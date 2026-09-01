const userModel = require("../models/user.model")
const crypto = require('crypto')
const jwt = require('jsonwebtoken')


async function registerController (req, res) {
    const { username, email, password, bio, profileImage } = req.body

    const isuseralready = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })
    if (isuseralready) {
        return res.status(409).json({
            message: "user already exist" + isuseralready.email == email ? "email already exist" : "Username already exist"
        })
    }

    const hash = crypto.createHash('sha256').update(password).digest('hex')

    const user = await userModel.create({
        username,
        email,
        password: hash,
        bio,
        profileImage
    })

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET, { expiresIn: '1d' })

    res.cookie("jwt_token", token)
    res.status(201).json({
        message: "user registered successfully",
        user: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })

}

async function loginController (req, res){

    const {username,email,password}=req.body
    const user = await userModel.findOne({
        $or: [
            { username: username },
            { email: email }
        ]
    })
    if (!user) {
        return res.status(404).json({
            message: "User not found"
        })
    }

    const hash = crypto.createHash('sha256').update(password).digest('hex')

    const ispasswordmatched = hash == user.password
    if (!ispasswordmatched) {
        return res.status(401).json({
            message: "invalid password"
        })
    }
    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET, { expiresIn: '1d' }
    )

    res.cookie("jwt_token", token)
    res.status(200).json({
        message:"user loggedin successfully",
        user:{
            username:user.username,
            email:user.email,
            bio:user.bio,
            profileImage:user.profileImage
        }
    })

}

module.exports={
    registerController,
    loginController
}