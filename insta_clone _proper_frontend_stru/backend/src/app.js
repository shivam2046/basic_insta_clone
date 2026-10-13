const express= require("express")
const authrouter= require("./routes/authrouter")
const postrouter= require('./routes/postrouter')
const cors=require('cors')
const cookieParser = require('cookie-parser')


const app= express()
app.use(express.json())

app.use(cookieParser())

app.use(cors({
    credentials:true,
    origin:"http://localhost:5173"
},{
    withCredentials:true
}))

app.use("/api/auth",authrouter)
app.use('/api/post',postrouter)

module.exports=app
