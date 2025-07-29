import React, { useState } from 'react'
import logo from "../assets/vcart logo.png"
import googlelogo from "../assets/Google_Icons-09-512.webp"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { useContext } from 'react';
import { authDataContext } from '../context/AuthContext';
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../utils/firebase'
import { userdatacontext } from '../context/Userprotected'
import { toast } from 'react-toastify';

const Register = () => {

  const navigate = useNavigate();
  const [showpassword, setShowpassword] = useState(false)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const {serverUrl}= useContext(authDataContext);
  const{getcurruser}=useContext(userdatacontext);

  const submithandler=async(e)=>{
    e.preventDefault()
    try{
      const result =await axios.post(serverUrl + "/api/auth/register",{
        name,email,password
      },{withCredentials:true})
      toast.success("Registration Successfull")
      getcurruser()
      navigate("/");
      console.log(result.data)

    }catch(error){
      console.log(error)
      toast.error("Registration Failed")
    }
  }


  const Googlesignup=async ()=>{
    try{
      const response =await signInWithPopup(auth,provider)
      const user=response.user
      const name=user.displayName
      const email=user.email

      const result=await axios.post(serverUrl + "/api/auth/googlelogin",{
        name,email
      },{withCredentials:true})
      
      toast.success("Registration Successful")
      getcurruser()
      navigate("/");
      console.log(result)

    }catch(error){
      console.log(error)
      toast.error("Registration Failed")
    }
  }

  return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] flex flex-col items-center justify-start '>

      <div onClick={() => navigate("/")} className='w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer '>
        <img className='w-[40px] ' src={logo} alt="" />
        <h1 className='text-[22px] font-sans '>AiOneCart</h1>
      </div>

      <div className='w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px] '>
        <span className='text-[25px] font-semibold '>Registrayion Page</span>
        <span className='text-[16px] '>Wellcome to AiCart, Place Your Order</span>
      </div>



      <div className='max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border-[1px] border-[#96969635] backdrop:blur-2xl rounded-lg shadow-lg flex items-center justify-center '>

        <form onSubmit={submithandler} action="" className='w-[90%] h-[90%] flex flex-col items-center justify-start gap-[10px] py-[20px] cursor-pointer '>
          <div onClick={Googlesignup} className='w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[20px] cursor-pointer '>
            <img src={googlelogo} alt="" className='w-[20px] ' />Registration With Google
          </div>

          <div className='w-[100%] h-[20px] flex items-center justify-center gap-[10px] '>
            <div className='w-[40%] h-[1px] bg-[#96969635] '></div>
            Or
            <div className='w-[40%] h-[1px] bg-[#96969635] '></div>
          </div>

          <div className='w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px] relative '>
            <input onChange={(e)=>setName(e.target.value)} value={name} placeholder='Username' required type="text" className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder:[#ffffffc7] px-[20px] font-semibold ' />
            <input onChange={(e)=>setEmail(e.target.value)} value={email} placeholder='email' required type="email" className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder:[#ffffffc7] px-[20px] font-semibold ' />
            <input onChange={(e)=>setPassword(e.target.value)} value={password} placeholder='Password' required type={showpassword ? "text" : "password"} className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder:[#ffffffc7] px-[20px] font-semibold ' />
            {!showpassword && <IoEyeOutline onClick={()=>setShowpassword(true)} className='w-[20px] h-[20px] cursor-pointer absolute right-[5%] '/>}
            {showpassword && <IoEyeOffOutline onClick={()=>setShowpassword(false)}  className='w-[20px] h-[20px] cursor-pointer absolute right-[5%] '/>}

            <button className='w-[100%] h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold '>
              Create Account
            </button>

            <p className='flex gap-[10px] '>You Have Any Account ? <span onClick={() => navigate('/login')} className='text-[#5555f6cf] text-[17px] font-semibold cursor-pointer '>Login</span></p>
          </div>

        </form>

      </div>



    </div>
  )
}

export default Register
