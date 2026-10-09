const express= require("express")
const authcontroller= require("../controller/auth.controller")
const identifyuser= require('../middleware/auth.middleware')

const authrouter= express.Router()

authrouter.post("/",authcontroller.register)
authrouter.post("/login",authcontroller.login)
authrouter.get('/get-me',identifyuser, authcontroller.getme)

module.exports= authrouter