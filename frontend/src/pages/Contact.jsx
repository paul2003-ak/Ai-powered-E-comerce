import React from 'react'
import Title from '../component/Title'
import contact from '../assets/contact.jpg'
import NewLetterbox from '../component/NewLetterbox'

const Contact = () => {
  return (
    <div className=' w-[100vw] min-h-[100vh] flex items-center justify-center flex-col bg-gradient-to-l from-[#141414] to-[#0c2025] gap-[50px] pt-[80px] '>
      <Title text1={"CONTACT"} text2={"US"} />
      <div className=' w-[100%] flex items-center justify-center flex-col lg:flex-row '>
        <div className=' lg:w-[50%] w-[100%] flex items-center justify-center '>
          <img src={contact} alt="" className=' lg:w-[70%] w-[80%] shadow-md shadow-black rounded-s-md ' />
        </div>

        <div className=' lg:w-[50%] w-[80%] flex items-start justify-center gap-[20px] flex-col mt-[20px] lg:mt-[0px] '>
            <p className=' lg:w-[80%] w-[100%] text-[white] font-bold lg:text-[18px] text-[15px] '>Our Store</p>

           <p className= ' lg:w-[80%] w-[100%] text-[white] md:text-[16px] text-[13px] '>
            <p>12345 Station</p>
            <p> Kolkata , Newtown </p>
           </p>

           <p className= ' lg:w-[80%] w-[100%] text-[white] md:text-[16px] text-[13px] '>
            <p>+91 8670893850</p>
            <p> Email: ayanpaulcse08@gmail.com</p>
           </p>

            <p className=' lg:w-[80%] w-[100%] text-[15px] text-[white] lg:text-[18px] mt-[10px] font-bold  '> Careers at AiOne Cart</p>
            <p className='  lg:w-[80%] w-[100%] md:text-[16px] text-[13px] text-[white]  '> Learn more about our teams and job openings</p>

            <button className=' px-[30px] py-[20px] flex items-center justify-center text-[white] bg-transparent border active:bg-slate-600 rounded-md  '>Explore Jobs</button>

            
        </div>
      </div>
      <NewLetterbox/>
    </div>
  )
}

export default Contact