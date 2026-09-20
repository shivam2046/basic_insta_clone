
const followModel= require('../models/follow.model')
const userModel= require('../models/user.model')

async function followuserController(req,res){

    const followerusername=req.user.username
    const followeeusername= req.params.username

    if(followerusername==followeeusername){
        return res.status(400).json({
            message:'you cant follow yourself'
        })
    }

    const isfolloweeexist= await userModel.findOne({
        username:followeeusername
    })
    if(!isfolloweeexist){
        return res.status(404).json({
            message:"user you are trying to follow does not exist"
        })
    }
    const isalreadyfollowing= await followModel.findOne({
        followee:followeeusername,
        follower:followerusername
    })
    if(isalreadyfollowing){
        return res.status(200).json({
            message:`you are already following ${followeeusername}`
        })
    }

    const followrecord= await followModel.create({
        follower:followerusername,
        followee:followeeusername
    })

    res.status(201).json({
        message:`you are nopw following ${followeeusername}`,
        followrecord
    })

}

async function unfollowuserController(req,res){

    const followerusername=req.user.username
    const followeeusername= req.params.username

    if(followerusername==followeeusername){
        return res.status(400).json({
            message:"you cant unfollow yourself"
        })
    }

    const isuserfollowing= await followModel.findOne({
        follower:followerusername,
        followee:followeeusername
    })
    if(!isuserfollowing){
        return res.status(200).json({
            message:`you are not following ${followeeusername}`
        })
    }
    
    await followModel.findByIdAndDelete(isuserfollowing._id)
    res.status(200).json({
        message:`you have unfollow ${followeeusername}`
    })

}

module.exports={
    followuserController,
    unfollowuserController
}