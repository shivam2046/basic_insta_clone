import React from 'react'
import '../style/form.scss'
import { Link } from 'react-router'
import login from './Login'
import { useState } from 'react'
import axios from 'axios'

const Register = () => {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function handleSubmit(e){
        e.preventDefault()

        axios.post('http://localhost:3000/api/auth/',{
            username,email,password
        },{
            withCredentials:true
        })
        .then(res=>{
            console.log(res.data)
        })
    }

    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <input 
                    onInput={(e)=>{setUsername(e.target.value)}}
                    name='username' type="text" placeholder='Enter Username' />
                    <input 
                    onInput={(e)=>{setEmail(e.target.value)}}
                    name='email' type="text" placeholder='Enter email' />
                    <input 
                    onInput={(e)=>{setPassword(e.target.value)}}
                    name='password' type="text" placeholder='Enter password' />
                    <button className='button primary_button' type='submit'>Register</button>

                </form>
                <p>Already have an account <Link className='toggleauthform' to='/login'>Login</Link> </p>
            </div>
        </main>
    )
}

export default Register
