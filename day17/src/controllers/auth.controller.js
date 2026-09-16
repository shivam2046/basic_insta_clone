const userModel = require('../models/user.model')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

async function registerController(req, res) {
    const { username, email, password, bio, profileImage } = req.body

    const isuseralreadyexist = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })
    if (isuseralreadyexist) {

        if (isuseralreadyexist.email === email) {
            return res.status(409).json({
                message: "User already exists with this email"
            });
        }

        if (isuseralreadyexist.username === username) {
            return res.status(409).json({
                message: "User already exists with this username"
            });
        }
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

    res.cookie('token', token)
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

module.exports = {
    registerController
}