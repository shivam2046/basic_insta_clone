const express= require("express")
const postcontroller= require("../controller/post.controller")
const identifyuser= require('../middleware/auth.middleware')


const multer= require('multer')
const upload= multer({storage:multer.memoryStorage()})

const postrouter=express.Router()


postrouter.post('/',upload.single("image"),postcontroller.createpostcontroller)
postrouter.get('/',identifyuser,postcontroller.getpost)
postrouter.get("/details/:postId", identifyuser, postcontroller.getpostdetail)
postrouter.get("/getfeed",identifyuser,postcontroller.getfeed)

module.exports= postrouter