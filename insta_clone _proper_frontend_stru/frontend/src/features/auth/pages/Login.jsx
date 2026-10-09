import React from 'react'
import '../style/form.scss'
import { Link, useNavigate } from 'react-router'
import { useState } from 'react'
import axios from 'axios'
import {useAuth} from "../hooks/useAuth"
import { Navigate } from 'react-router'

const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const {handleLogin, loading} =useAuth()

    const navigate=useNavigate()
   
    if(loading){
        return (
        <h1>loading...</h1>
        )
    }

     function handleSubmit(e) {
        e.preventDefault()
        
        handleLogin(username,password)
        .then(res=>{
            console.log(res)
             navigate('/')
        })
    }

  return (
    <main>
        <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <input 
             onInput={(e)=>{setUsername(e.target.value)}}
             type="text" placeholder='Enter Username' />
            <input
             onInput={(e)=>{setPassword(e.target.value)}}
            type="text" placeholder='Enter password'/>
            <button className='button primary_button' type='submit'>Login</button>

        </form>
        <p>Don't have an account <Link className='toggleauthform' to='/'>Register</Link> </p>
        </div>
    </main>
  )
}

export default Login
