import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from "../assets/vcart logo.png"
import googlelogo from "../assets/Google_Icons-09-512.webp"
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import axios from 'axios';
import { authDataContext } from '../context/AuthContext';
import { auth, provider } from '../../utils/firebase'
import { signInWithPopup } from 'firebase/auth';
import { userdatacontext } from '../context/userprotected';
import { toast } from 'react-toastify';


const Login = () => {
  const navigate = useNavigate();
  const [showpassword, setShowpassword] = useState(false)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const {serverUrl}= useContext(authDataContext);
  const{getcurruser}=useContext(userdatacontext);

  const submithandler=async(e)=>{
    e.preventDefault()
    try{
      const result =await axios.post(serverUrl + "/api/auth/login",{
        email,password
      },{withCredentials:true})
      toast.success("Login Successful")
      getcurruser()
      navigate("/");
      console.log(result.data)

    }catch(error){
      console.log(error)
      toast.error("Login Failed")
    }
  }


  const Googlelogin=async ()=>{
    try{
      const response =await signInWithPopup(auth,provider)
      const user=response.user
      const name=user.displayName
      const email=user.email

      const result=await axios.post(serverUrl + "/api/auth/googlelogin",{
        name,email
      },{withCredentials:true})
      toast.success("Login Successfull")
      getcurruser()
      navigate("/");
      console.log(result)

    }catch(error){
      console.log(error)
      toast.error("Login Failed")
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
        <span className='text-[16px] '>Wellcome to AiCart, Place Your Order</span>
      </div>



      <div className='max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border-[1px] border-[#96969635] backdrop:blur-2xl rounded-lg shadow-lg flex items-center justify-center '>

        <form  onSubmit={submithandler} action="" className='w-[90%] h-[90%] flex flex-col items-center justify-start gap-[10px] py-[20px] cursor-pointer '>
          <div onClick={Googlelogin} className='w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[20px] cursor-pointer '>
            <img src={googlelogo} alt="" className='w-[20px] ' />Login account With Google
          </div>

          <div className='w-[100%] h-[20px] flex items-center justify-center gap-[10px] '>
            <div className='w-[40%] h-[1px] bg-[#96969635] '></div>
            Or
            <div className='w-[40%] h-[1px] bg-[#96969635] '></div>
          </div>

          <div className='w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px] relative '>
            <input onChange={(e)=>setEmail(e.target.value)} value={email} placeholder='email' required type="email" className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder:[#ffffffc7] px-[20px] font-semibold ' />
            <input onChange={(e)=>setPassword(e.target.value)} value={password} placeholder='Password' required type={showpassword ? "text" : "password"} className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder:[#ffffffc7] px-[20px] font-semibold ' />
            {!showpassword && <IoEyeOutline onClick={()=>setShowpassword(true)} className='w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[57%] '/>}
            {showpassword && <IoEyeOffOutline onClick={()=>setShowpassword(false)}  className='w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[57%] '/>}

            <button className='w-[100%] h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold '>
              Login
            </button>

            <p className='flex gap-[10px] '>You haven't any Account ? <span onClick={() => navigate('/signup')} className='text-[#5555f6cf] text-[17px] font-semibold cursor-pointer '>Sign UP</span></p>
          </div>

        </form>

      </div>



    </div>
  )
}

export default Login