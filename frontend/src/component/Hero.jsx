import React from 'react'
import { FaCircle } from "react-icons/fa";

const Hero = ({herodata,herocount,setHerocount}) => {

  return (
    <div className='w-[40%] h-[100%] relative '>
        <div className=' absolute text-[#88d9ee] text-[20px] md:text-[40px] lg:text-[55px] md:left-[10%] md:top-[90px] lg:top-[130px] left-[10%]  top-[10px] '>
            <p>{herodata.text1}</p>
            <p>{herodata.text2}</p>
        </div>

        <div className=' absolute md:top-[400px] lg:top-[500px] top-[160px] left-[10%] flex items-center justify-center gap-[10px] '>
        <FaCircle onClick={()=>setHerocount(0)} className={` w-[14px] ${herocount===0 ?"fill-orange-400" : "fill-white"} `} />
        <FaCircle onClick={()=>setHerocount(1)} className={` w-[14px] ${herocount===1 ?"fill-orange-400" : "fill-white"} `} />
        <FaCircle onClick={()=>setHerocount(2)}  className={` w-[14px] ${herocount===2 ?"fill-orange-400" : "fill-white"} `}/>
        <FaCircle onClick={()=>setHerocount(3)} className={` w-[14px] ${herocount===3 ?"fill-orange-400" : "fill-white"} `} />
        </div>
    </div>
  )
}

export default Hero