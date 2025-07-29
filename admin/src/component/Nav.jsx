import React from 'react'
import {useNavigate} from 'react-router-dom'
import logo from '../assets/vcart logo.png'
import axios from 'axios'
import { useContext } from 'react'
import { authDataContext } from '../context/Authcontext'
import { adminDatacontext } from '../context/Admincontext'

const Nav = () => {
  const navigate=useNavigate();
  const {serverURL}=useContext(authDataContext)
  const {getAdmin}=useContext(adminDatacontext)

  const logout=async()=>{
    try{
      const result=await axios.get(serverURL + "/api/auth/logout",{withCredentials:true});
      console.log(result.data)
      getAdmin();
      navigate("/login")
    }catch(error){
      console.log(error)
    }
  }
  return (
    <div className=' w-[100vw] h-[70px] bg-[#dcdbdbf8] z-10 fixed top-0 flex items-center justify-between px-[30px] overflow-x-hidden shadow-md shadow-black '>
        <div onClick={()=>navigate("/")} className=' w-[30%] flex items-center justify-start gap-[10px] cursor-pointer '>
            <img src={logo} alt="" className=' w-[30px] ' />
            <h1 className=' text-[25px] text-black font-sans '>AiCart</h1>
        </div>
        <div>
        <button onClick={logout} className=' text-[15px] hover:border-[2px] border-[#89daea] curson-pointer bg-[#000000ca] py-[10px] px-[20px] rounded-2xl text-white '>
              Logout
            </button>
        </div>
    </div>
  )
}

export default Nav