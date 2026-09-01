const postModel= require('../models/post.model')

async function createpost(req,res){
    console.log(req.body,req.file)
}

async function deletepost(req,res){
    console.log("it is running")
}

module.exports={createpost,deletepost}