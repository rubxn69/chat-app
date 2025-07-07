import React, { useState } from 'react'
import './Login.css'
import assets from '../../assets/assets'
import { signup, login } from '../../config/firebase'

const Login = () => {

    const [currState, setCurrState] = useState("Sign Up");
    const [userName,setUserName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const onSubmitHandler = (event) => {
        event.preventDefault();
        if (currState == "Sign Up"){
            signup(userName,email,password)
        }
        else{
            login(email,password)
        }
    }

    return (
        <div className='login'>
            <div className="login-content">
                <img src={assets.logo_big} className='logo' alt="Logo"/>
                <form onSubmit={onSubmitHandler} className='login-form'>
                    <h2>{currState}</h2>
                    {currState=="Sign Up"?<input onChange={(e)=>setUserName(e.target.value)} value = {userName} type="text" placeholder='Username' className="form-input" required />:null}
                    <input onChange={(e)=>setEmail(e.target.value)} value = {email} type="email" placeholder='Email Address' className="form-input" required />
                    <input onChange={(e)=>setPassword(e.target.value)} value = {password} type="password" className="form-input" placeholder='Password' required/>
                    <button type='submit'>{currState=="Sign Up"?"Create account":"Login"}</button>
                    <div className='login-term'>
                        <input type='checkbox'/>
                        <p>Agree to the terms and conditions</p>
                    </div>
                    <div className="login-forgot">
                        {currState=="Sign Up"?<p className="login-toggle">
                            Already have an account <span onClick={()=> setCurrState("Login")}>Login here</span>
                        </p>:<p className="login-toggle">
                            Create an account <span onClick={()=> setCurrState("Sign Up")}>click here</span>
                        </p>}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login