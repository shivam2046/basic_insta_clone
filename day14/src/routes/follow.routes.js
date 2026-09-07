const express= require('express')
const followController= require('../controllers/follow.controller')
const identifyuser= require('../middlewares/auth.middleware')

const followRouter=express.Router()

followRouter.post('/follow/:username',identifyuser,followController.followuserController)

followRouter.post('/unfollow/:username',identifyuser,followController.unfollowuserController)

module.exports=followRouter