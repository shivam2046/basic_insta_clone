import React from 'react'
import '../style/form.scss'
import { Link,useNavigate } from 'react-router'
import login from './Login'
import { useState } from 'react'
import axios from 'axios'
import { Navigate } from 'react-router'
import {useAuth} from "../hooks/useAuth"


const Register = () => {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { handleRegister, loading } = useAuth()

    const navigate = useNavigate()
    if (loading) {
        return (
            <main><h1>loading...</h1></main>
        )
    }
    async function handleSubmit(e) {
        e.preventDefault()

        handleRegister(username,email,password)
        .then(res=>{
            console.log(res)
             navigate('/login')
        })
    }

    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        onInput={(e) => { setUsername(e.target.value) }}
                        name='username' type="text" placeholder='Enter Username' />
                    <input
                        onInput={(e) => { setEmail(e.target.value) }}
                        name='email' type="text" placeholder='Enter email' />
                    <input
                        onInput={(e) => { setPassword(e.target.value) }}
                        name='password' type="text" placeholder='Enter password' />
                    <button className='button primary_button' type='submit'>Register</button>

                </form>
                <p>Already have an account <Link className='toggleauthform' to='/login'>Login</Link> </p>
            </div>
        </main>
    )
}

export default Register
