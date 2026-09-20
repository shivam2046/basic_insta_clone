const express = require("express");
const multer = require("multer");
const postController = require("../controllers/post.controller");
const postRouter = express.Router();
const upload = multer({
    storage: multer.memoryStorage()
});
const identifyUser=require("../middlewares/auth.middleware")

postRouter.post(
    "/",
    upload.single("image"),identifyUser,
    postController.createpostController
); 

postRouter.get('/',identifyUser,postController.getpostController)

postRouter.get('/details/:postId',identifyUser,postController.getpostdetailController)

postRouter.post('/like/:postId',identifyUser,postController.likepostController)

module.exports = postRouter;