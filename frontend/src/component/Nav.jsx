import React, { useContext, useState } from 'react'
import onecart from "../assets/vcart logo.png"
import { IoSearchCircleOutline } from "react-icons/io5"; import { FaUserCircle } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { userdatacontext } from '../context/userprotected';
import { IoSearchCircle } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authDataContext } from '../context/AuthContext';
import { MdHome } from "react-icons/md";
import { HiOutlineCollection } from "react-icons/hi";
import { MdContacts } from "react-icons/md";
import { toast } from 'react-toastify';
import { shopcontext } from '../context/Shopdatacontext';

export const Nav = () => {
    const navigate = useNavigate()
    const { userdata, getcurruser } = useContext(userdatacontext)
    const {serverUrl} = useContext(authDataContext)

    const {showsearch, setShowsearch, search, setSearch , getCartCount} = useContext(shopcontext)
    const [showprofile, setShowprofile] = useState(false)



    const handlelogout = async () => {
        try {
            const result = await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true });
            toast.success("Logout successful!");
            console.log(result.data);
            getcurruser();
        } catch (error) {
            console.log(error)
            toast.error("Logout failed.");
        }
    }


    return (
        <div className='w-[100vw]  h-[70px] bg-[#ecfafaec] z-10 fixed top-0 flex items-center justify-between px-[30px] shadow-md shadow-black '>

            <div onClick={() => {setShowsearch(false),navigate("/")}} className='w-[20%] lg:w-[30%] flex items-center justify-start gap-[10px] cursor-pointer'>
                <img src={onecart} alt="" className='w-[30px] ' />
                <h1 className='text-[25px] text-[black] font-sans '>AiOneCart</h1>
            </div>

            <div className='w-[50%] lg:w-[40%] hidden md:flex '>
                <ul className=' flex items-center justify-center gap-[19px] text-[white] '>
                    <li onClick={()=>{setShowsearch(false),navigate("/")}} className='text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl '>HOME</li>
                    <li onClick={()=>navigate("/collection")} className='text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px]  px-[20px] rounded-2xl '>COLLECTIONS</li>
                    <li onClick={()=>navigate("/about")} className='text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px]  px-[20px] rounded-2xl '>ABOUT</li>
                    <li onClick={()=>navigate("/contact")} className='text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px]  px-[20px] rounded-2xl '>CONTACT</li>
                </ul>
            </div>

            <div className='w-[30%] flex items-center justify-end gap-[20px] '>
                {!showsearch && <IoSearchCircleOutline onClick={() => {setShowsearch(prev => !prev), navigate("/collection")}} className=' w-[38px] h-[39px] text-[#000000] cursor-pointer ' />}
                {showsearch && <IoSearchCircle onClick={() => setShowsearch(prev => !prev)} className=' w-[38px] h-[39px] text-[#000000] cursor-pointer ' />}

                {!userdata && <FaUserCircle onClick={() => setShowprofile(prev => !prev)} className=' w-[29px] h-[29px] text-[#000000] cursor-pointer  ' />}
                {userdata && <div onClick={() => setShowprofile(prev => !prev)} className=' w-[30px] h-[30px] bg-[#080808] text-[white] rounded-full flex items-center justify-center cursor-pointer '>
                    {userdata?.name.slice(0, 1)}</div>}

                <IoMdCart onClick={()=>navigate('/cart')} className='w-[34px] h-[35px] text-[#000000] cursor-pointer hidden md:block ' />
                <p className=' hidden md:block  absolute w-[18px] h-[18px] items-center justify-center bg-black px-[5px] py-[2px]
                 text-white rounded-full text-[9px] top-[10px] right-[23px]  '>{getCartCount()}</p>
            </div>


            {/* search place */}
            {showsearch && <div className=' w-[100%] h-[80px] bg-[#d8f6f9dd] absolute top-[100%] left-0  right-0 flex items-center justify-center '>
                <input onChange={(e)=>setSearch(e.target.value)} value={search} type="text" placeholder='Search here' className=' lg:w-[50%] w-[80%] h-[60%] bg-[#233533] rounded-[30px] px-[50px] placeholder:text-white text-[white] text-[18px] ' />
            </div>}

            {/* show profile */}
            {showprofile && <div className=' absolute w-[220px] h-[150px] bg-[#000000d7] top-[110%] right-[4%] border-[1px] border-[#aaa9a9] rounded-[10px] z-10  '>
                <ul className='w-[100%] h-[100%] flex items-start justify-around flex-col text-[17px] py-[10px] text-[white] '>

                    {!userdata && <li onClick={() => {
                        navigate("/login"),
                            setShowprofile(prev => !prev)
                    }} className=' w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer '>
                        Login</li>
                    }

                    {userdata && <li onClick={() => {
                        handlelogout(),
                            setShowprofile(prev => !prev)
                    }} className=' w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer '>Logout</li>}

                    <li onClick={() => {
                        navigate("/order"),
                        setShowprofile(prev => !prev)
                    }} className=' w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer '>Orders</li>

                    <li onClick={() => {
                        navigate("/about"),
                        setShowprofile(prev => !prev)
                    }} className=' w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer '>About</li>
                </ul>
            </div>}

            
            {/* FOOTER PART */}
            <div className='w-[100vw] h-[90px] flex items-center justify-between px-[20px] text-[12px]
             fixed bottom-0 left-0 bg-[#191818] md:hidden '>
                    <button onClick={()=>navigate("/")} className=' text-[white] flex items-center justify-center flex-col gap-[2px]  '> <MdHome className='w-[25px] h-[25px] text-[white] md:hidden ' />Home</button>
                    <button onClick={()=>navigate("/collection")} className=' text-[white] flex items-center justify-center flex-col gap-[2px]  '> <HiOutlineCollection className='w-[25px] h-[25px] text-[white] md:hidden ' />Collections</button>
                    <button onClick={()=>navigate("/contact")} className=' text-[white] flex items-center justify-center flex-col gap-[2px]  '> <MdContacts className='w-[25px] h-[25px] text-[white] md:hidden ' />Contact</button>
                    <button onClick={()=>navigate('/cart')} className=' text-[white] flex items-center justify-center flex-col gap-[2px]  '> <IoMdCart className='w-[25px] h-[25px] text-[white] md:hidden ' />Cart</button>
                    <p className=' absolute w-[18px] h-[18px] flex items-center justify-center bg-white px-[5px] py-[2px] text-black font-semibold rounded-full text-[9px] top-[8px] right-[18px] '>
                        {getCartCount() }
                    </p>
            </div>

        </div>
    )
}
