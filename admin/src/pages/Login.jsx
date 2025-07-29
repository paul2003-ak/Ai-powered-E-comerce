import React, { useContext, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import logo from "../assets/vcart logo.png"
import axios from "axios"
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { authDataContext } from '../context/Authcontext';
import { adminDatacontext } from '../context/Admincontext'
import Loading from '../component/Loading'
import { toast } from 'react-toastify';

const Login = () => {
  const navigate=useNavigate()
  const [showpassword, setShowpassword] = useState(false)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const {serverURL}=useContext(authDataContext)
  const{ getAdmin}=useContext(adminDatacontext)


  const submithandler=async(e)=>{
    e.preventDefault()
    setLoading(true)
    try{
      const result=await axios.post(serverURL + "/api/auth/adminlogin",{email,password},{withCredentials:true});
      console.log(result.data)
      toast.success("Admin Login Successfull")
      getAdmin();
      setLoading(false)
      navigate("/")
    }catch(error){
      console.log("login admin error ",error);
      toast.error("Login Failed ")
      setLoading(false)
    }
  }
  return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] flex flex-col items-center justify-start '>

      <div onClick={() => navigate("/")} className='w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer '>
        <img className='w-[40px] ' src={logo} alt="" />
        <h1 className='text-[22px] font-sans '>AiOneCart</h1>
      </div>

      <div className='w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px] '>
        <span className='text-[25px] font-semibold '>Login Page</span>
        <span className='text-[16px] '>Wellcome to AiCart, Apply to Admin Login</span>
      </div>



      <div className='max-w-[600px] w-[90%] h-[400px] bg-[#00000025] border-[1px] border-[#96969635] backdrop:blur-2xl rounded-lg shadow-lg flex items-center justify-center '>

        <form  onSubmit={submithandler} action="" className='w-[90%] h-[90%] flex flex-col items-center justify-start gap-[10px] py-[20px] cursor-pointer '>
          
          <div className='w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px] relative '>
            <input onChange={(e)=>setEmail(e.target.value)} value={email} placeholder='email' required type="email" className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder:[#ffffffc7] px-[20px] font-semibold ' />
            <input onChange={(e)=>setPassword(e.target.value)} value={password} placeholder='Password' required type={showpassword ? "text" : "password"} className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder:[#ffffffc7] px-[20px] font-semibold ' />
            {!showpassword && <IoEyeOutline onClick={()=>setShowpassword(true)} className='w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[50%] '/>}
            {showpassword && <IoEyeOffOutline onClick={()=>setShowpassword(false)}  className='w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[50%] '/>}

            <button disabled={loading} className='w-[100%] h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold disabled:bg-blue-400 disabled:cursor-not-allowed '>
              {loading ? <Loading/> : "Login"}
            </button>

            
          </div>

        </form>

      </div>



    </div>
  )
}

export default Login