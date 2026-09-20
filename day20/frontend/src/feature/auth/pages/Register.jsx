import React from 'react'
import login from './Login.jsx'
import {Link} from 'react-router'
import '../style/form.scss'


const Register = () => {
  return (
    <main>
      <div className="form-container">
        <p>Register</p>
        <form  className='form'>
          <input type="text" name='username' id='username' placeholder='Enter username' />
          <input type="text" name='email' id='email' placeholder='Enter your email' />
          <input type="text" name='password' id='password' placeholder='Enter password' />
          <button className='button primary-button' >Register</button>
        </form>
        <p>Don't have an account <Link className='toggleauthform' to='/login'>Login</Link> </p>
      </div>
    </main>
  )
}

export default Register
