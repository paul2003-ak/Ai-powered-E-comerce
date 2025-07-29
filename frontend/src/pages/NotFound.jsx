import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate=useNavigate();
  return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] md:text-[70px] text-[30px] flex items-center justify-center text-[white] flex-col gap-[20px]'>
            404 Page not Found
        <button onClick={()=>navigate("/")} className=' bg-[white] text-[black] px-[20px] py-[10px] rounded-md hover:bg-[#3b5a5a] transition-all text-[18px] cursor-pointer duration-300'>Go Home</button>
    </div>
  )
}

export default NotFound