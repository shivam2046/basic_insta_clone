const mongoose= require('mongoose')

const postSchema= new mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    imageurl:{
        type:String,
        required:[true,"imageURL is required"]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:[true,"userId is required"]
    }
})

const postModel= mongoose.model("post",postSchema)

module.exports=postModel
