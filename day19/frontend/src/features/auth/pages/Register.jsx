import React, { useState } from 'react'
import { Link } from 'react-router'
import '../style/form.scss'
import axios from 'axios'


const Register = () => {
  const [username, setUsername] = useState("")
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handlesubmit(e) {
    e.preventDefault();

    

  }


  return (
    <main>
      <div className="form-container">
        <p>Register</p>
        <form onSubmit={handlesubmit}>
          <input
            onChange={(e) => { setUsername(e.target.value) }}
            type="text"
            placeholder='Enter username'
          />
          <input
            onChange={(e) => { setEmail(e.target.value) }}
            type="text"
            placeholder='Enter email' />

          <input 
          onChange={(e)=>{setPassword(e.target.value)}}
          type="text" 
          placeholder='password' />

          <button type='submit'>Register</button>
        </form>
        <p>Already have an account? <Link className='toggleAuthForm' to="/login">Login</Link></p>
      </div>
    </main>
  )
}

export default Register
