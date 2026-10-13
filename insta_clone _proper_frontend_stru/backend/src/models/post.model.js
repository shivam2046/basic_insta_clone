const mongoose= require('mongoose')

const postSchema= new mongoose.Schema({
    captio:{
        type:String,
        default:""
    },
    imageURL:{
        type:String,
        required:[true,"imageurl is required"],
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:[true,"UserId is required to create a post"]
    }
})

const PostModel=new mongoose.model("post",postSchema)

module.exports=PostModel