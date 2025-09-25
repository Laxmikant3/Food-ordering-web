import React, {useEffect, useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import {StoreContext} from '../../context/StoreContext.jsx'
import axios from 'axios'

const LoginPopup = ({ setShowLogin }) => {

    const {url, setToken} = useContext(StoreContext) 

    const [currentState, setCurrentState] = useState("Sign Up")

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    })

    const onChangeHandler= (event)=>{
        const name = event.target.name 
        const value = event.target.value
        setData(data=>({...data,[name]:value}))     
    }

    const onLogin = async (event)=>{
        event.preventDefault()
        let newUrl = url ;

        if (currentState==="Login") {
            newUrl += "/api/user/login";
        } else {
            newUrl += "/api/user/register";
        }

        const response = await axios.post(newUrl, data);
        if(response.data.success){
            setToken(response.data.token);
            localStorage.setItem("token",response.data.token);
            // localStorage.setItem("url", url);

            setShowLogin(false)
        }else{
            alert(response.data.message)
        }
    }

    return (
        <div className='login-popup'>

            <form onSubmit={onLogin} action="" className='login-popup-container'>
                <div className="login-popup-title">
                    <h2>{currentState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>

                <div className="login-popup-input">

                    { currentState === "Login" 
                    ? <></> 
                    : <input onChange={onChangeHandler} name="name" value={data.name} placeholder='Your name' type="text" /> }

                    <input onChange={onChangeHandler} name="email" value={data.email} placeholder='Your email' type="email" />
                    <input onChange={onChangeHandler} name="password" value={data.password} placeholder='Password' type="password" />
                </div>

                <button type='submit'>{currentState === "Sign Up" ? "Create account" : "Login"}</button>

                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, i agree to the terms of use & privacy policy. </p>
                </div>

                {currentState === "Sign Up"
                    ?<p>Already have an account? 
                        <span onClick={() => setCurrentState("Login")}>Login</span></p>
                    : <p>Create a new account? 
                        <span onClick={() => setCurrentState("Sign Up")}>click here</span></p>
                }
            </form>
        </div>
    )
}

export default LoginPopup
