import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"

import "./css/login.css"
import { TodoReducer } from '../context/TodoReducer'
import { loginUser, signupUser } from '../api/apicalls';

export default function Login() {
    const navigate=useNavigate();
    const [isLogin,setIsLogin]=useState(true);
    const [credentials,setCredentials]=useState({email:"",password:""});

    const inputChangehandler=(e)=>{
        setCredentials((prev)=>({...prev,[e.target.name]:e.target.value}));
    }
    const loginHandler=async(e)=>{
        e.preventDefault();
        const res=await loginUser(credentials);
        console.log(res);
        if(res.success){
            localStorage.setItem('auth-token',res.authToken);
            navigate("./todo")
            
        }
        else{
            alert(res.msg);
        }
        setCredentials({email:"",password:""})
        setCredentials({email:"",password:""})
    }
    const signupHandler=async(e)=>{
        e.preventDefault();
        const res= await signupUser(credentials);
        console.log(res);
        if(res.success){
            localStorage.setItem('auth-token',res.authToken);
            navigate("./todo")
            
        }
        else{
            alert(res.msg);
        }
        setCredentials({name:"" , email:"",password:""})
    }
  return (
    <div className='login'>
        <div className="heading">
        <h2 className='heading'>"Take control of your schedule </h2>
        <h2 className='heading'>      and maximize your productivity."</h2>
        </div>
        <div className="login__conatiner ">
      
            <div className={`login__page page ${isLogin?"active":""}`}>
                <h1>Login</h1>
                <form>
                <label htmlFor="email" >
                    Email:
                </label>
                <input type="email" name="email" value={credentials?.email} onChange={inputChangehandler} />
                <label htmlFor="password">
                    Password:
                   
                </label>
                <input type="password" name="password"  value={credentials?.password} onChange={inputChangehandler} />

                    <input type="submit" name="login" onClick={loginHandler} />
                    <Link onClick={()=>setIsLogin(!isLogin)}>New-user?? Login</Link>
        
                </form>
            </div>
            <div className={`signup__page page ${!isLogin?"active":""}`}>
                <h1>Sign-Up</h1>
                <form>
                <label htmlFor="name">
                    Name:
                    <input type="text" name="name" value={credentials?.name} onChange={inputChangehandler} />
                </label>
                <label htmlFor="email">
                    Email:
                    <input type="email" name="email"  value={credentials?.email}  onChange={inputChangehandler} />
                </label>
                <label htmlFor="password">
                    Password:
                    <input type="password" name="password"  value={credentials?.password}  onChange={inputChangehandler} />
                </label>

                    <input type="submit" name="signup" onClick={signupHandler} />
                    <Link onClick={()=>setIsLogin(()=>!isLogin)}>Already a user??</Link>
                </form>

            </div>
        </div>
      
    </div>
  )
}
