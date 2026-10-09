const mongoose= require("mongoose")

const userSchema=new mongoose.Schema({
    username:{
        unique:true,
        required:true,
        type:String,
    },
    email:{
        required:true,
        type:String,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

const userModel= mongoose.model("user",userSchema)

module.exports=userModel