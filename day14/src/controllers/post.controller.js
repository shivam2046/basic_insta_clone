const postModel= require('../models/post.model')
const ImageKit= require("@imagekit/nodejs")
const { toFile }= require("@imagekit/nodejs")
const jwt= require("jsonwebtoken")

const imagekit=new ImageKit({
    privatekey:process.env.IMAGEKIT_PRIVATE_KEY
})

async function createpostController(req,res){
    console.log(req.body,req.file)

    const file= await imagekit.files.upload({
        file:await toFile(Buffer.from(req.file.buffer),'file'),
        fileName:"instaclone"
    })
    res.send(file)
}



module.exports={
    createpostController
}