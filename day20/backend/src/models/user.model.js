const mongoose= require("mongoose")

const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:[true,"username is required"],
        unique:[true,"username already exist"]
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:[true,"email already exist"],  
    },password:{
        required:[true,"password is required"],
        type:String
    },bio:{
        type:"String"
    },profileImage:{
        type:String,
        default:"https://ik.imagekit.io/g6bgg0wef/SHIVAM%20PHOTO.jpg"
    }
})

const userModel= mongoose.model("user",userSchema)

module.exports= userModel