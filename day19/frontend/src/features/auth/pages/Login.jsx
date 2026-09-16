import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import '../style/form.scss'
// import Register from './register'
import axios from 'axios'
import { useAuth } from '../hooks/useAuth.jsx'

const Login = () => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const{handlelogin}=useAuth()
  const navigate=useNavigate()


   function handlesubmit(e) {
    e.preventDefault()
    handlelogin(username,password)
    .then(res=>{
    console.log(res)
    navigate('/')
    })
    
  }


  return (
    <main>
      <div className="form-container">
        <p>Login</p>
        <form onSubmit={handlesubmit}>
          <input
            onInput={(e) => { setUsername(e.target.value) }}
            type="text"
            placeholder='Enter username' />
          <input
            onInput={(e) => { (setPassword(e.target.value)) }}
            type="text"
            placeholder='Enter password' />
          <button type='submit'>Login</button>
        </form>
        <p>Don't have an account <Link className='toggleAuthForm' to="/register">Register</Link></p>

      </div>
    </main>
  )
}

export default Login
