const mongoose= require('mongoose')

const likeSchema= new mongoose.Schema({
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"post",
        required:[true,"post is required to like a post"]
    },
    user:{
        type:String,
        required:[true,"user is requirted to like a post"]
    }
},{
    timestamps:true 
})

likeSchema.index({post:1,user:1},{unique:true})

const likeModel= mongoose.model("like",likeSchema)

module.exports=likeModel