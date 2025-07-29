import React from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { useState } from 'react'
import { useContext } from 'react'
import { authDataContext } from '../context/Authcontext'
import axios from 'axios'
import { useEffect } from 'react'

const Home = () => {
  const [totalproduct, setTotalproduct] = useState(0)
  const [totalorder, setTotalorder] = useState(0)

  const { serverURL } = useContext(authDataContext);

  const fetchcount = async () => {
    try {
      const product = await axios.get(serverURL + "/api/product/alllist", { withCredentials: true });
      setTotalproduct(product.data.length);

      const order = await axios.get(serverURL + '/api/order/allorder', { withCredentials: true });
      setTotalorder(order.data.length);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchcount();
  }, [])

  return (
    <div className=' w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white relative '>
      <Nav />
      <Sidebar />

      <div className=' w-[70vw] h-[100vh] absolute left-[25%] flex item-start flex-col gap-[40px] py-[100px]  '>
        <h1 className=' text-[35px]  text-[#afe2f2] '>AiOneCart Admin Panel</h1>
        <div className=' flex items-center justify-start gap-[50px] flex-col md:flex-row '>
          <div className='text-[#dcfafd] w-[400px] max-w-[90%] h-[200px] bg-[#0000002e] flex items-center justify-center flex-col gap-[20px] rounded-lg shadow-sm shadow-black backdrop:blur-lg md:text-[25px] text-[20px] border-[1px] border-[#969595]'>
            Total Products: <span className=' px-[20px] py-[10px] bg-[#030e11] rounded-lg flex items-center 
            justify-center border-[1px] border-[#969595] '>{totalproduct}</span>
          </div>

          <div className='text-[#dcfafd] w-[400px] max-w-[90%] h-[200px] bg-[#0000002e] flex items-center justify-center flex-col gap-[20px] rounded-lg shadow-sm shadow-black backdrop:blur-lg md:text-[25px] text-[20px] border-[1px] border-[#969595]'>
            Total orders: <span className=' px-[20px] py-[10px] bg-[#030e11] rounded-lg flex items-center 
            justify-center border-[1px] border-[#969595] '>{totalorder}</span>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home