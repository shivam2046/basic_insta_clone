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
    },
    bio: {
    type: String,
    default: ""
},

profileImage: {
    type: String,
    default: "https://ik.imagekit.io/g6bgg0wef/instaclone_8JMY1Y2tI?updatedAt=1788351741226"
}
})

const userModel= mongoose.model("user",userSchema)

module.exports=userModel