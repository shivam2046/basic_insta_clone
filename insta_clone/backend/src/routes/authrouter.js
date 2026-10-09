const express= require("express")
const authcontroller= require("../controller/auth.controller")

const authrouter= express.Router()

authrouter.post("/",authcontroller.register)
authrouter.post("/login",authcontroller.login)

module.exports= authrouter