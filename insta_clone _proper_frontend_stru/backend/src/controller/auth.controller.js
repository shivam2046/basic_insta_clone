
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");


async function register(req, res) {

    const { username, email, password } = req.body;

    const isuser = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    });

    if (isuser) {
        return res.status(400).json({
            message: "user already exists"
        });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hash
    });

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    });

    res.cookie("token", token);

    res.status(201).json({
        message: "user registered successfully",
        user: {
            username: user.username,
            email: user.email
        }
    });
}

async function login(req, res) {

    const { username, email, password } = req.body;

    const user = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    }).select("+password")


    if (!user) {
        return res.status(404).json({
            message: "invalid credentials"
        });
    }

    const ispasswordmatched = await bcrypt.compare(
        password,
        user.password
    );

    if (!ispasswordmatched) {
        return res.status(404).json({
            message: "invalid credentials"
        });
    }

    const token = jwt.sign(
        {
            id: user._id,
            username: user.username
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );

    res.cookie("token", token);

    return res.status(200).json({
        message: "user logged in successfully",
        user: {
            username: user.username,
            email: user.email
        }
    });
}

async function getme(req,res) {
    const userId=req.user.id

    const user= await userModel.findById(userId)

    res.status(200).json({
        user:{
            username:user.username,
            email:user.email,
            bio:user.bio,
            profileImage:user.profileImage
        }
    })
}

    module.exports = {
        register,
        login,
        getme
    }