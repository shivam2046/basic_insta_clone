import React,{useState} from 'react'
import login from './Login.jsx'
import {Link,useNavigate} from 'react-router'
import '../style/form.scss'
import {useAuth} from '../hooks/use.Auth.js'


const Register = () => {

  const {loading,handleRegister}=useAuth()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate=useNavigate()

  const handleSubmit=async (e)=>{
    e.preventDefault()

    await handleRegister(username,email,password)
    navigate('/')
  }

  if(loading){
    return(<main><h1>loading...</h1></main>)
  }

  return (
    <main>
      <div className="form-container">
        <p>Register</p>
        <form  onSubmit={handleSubmit} className='form'>
          <input 
          onChange={(e)=>{setUsername(e.target.value)}}
          type="text" name='username' id='username' placeholder='Enter username' />
          
          <input 
          onChange={(e)=>{setEmail(e.target.value)}}
          type="text" name='email' id='email' placeholder='Enter your email' />
          
          <input 
          onChange={(e)=>{setPassword(e.target.value)}}
          type="text" name='password' id='password' placeholder='Enter password' />
          <button className='button primary-button' >Register</button>
        </form>
        <p>Don't have an account <Link className='toggleauthform' to='/login'>Login</Link> </p>
      </div>
    </main>
  )
}

export default Register
