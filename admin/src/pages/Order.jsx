import React from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { useState } from 'react'
import { useContext } from 'react'
import { authDataContext } from '../context/Authcontext'
import axios from 'axios'
import { useEffect } from 'react'
import { SiEbox } from "react-icons/si";


const Order = () => {
  const [order, setOrder] = useState([])
  const { serverURL } = useContext(authDataContext);

  const fetchallorders = async () => {
    try {
      const respose = await axios.get(serverURL + '/api/order/allorder', { withCredentials: true })
      setOrder(respose.data.reverse());
    } catch (error) {
      console.log(error);
    }
  }

  const statusHandler = async (e, orderId) => {
    const status = e.target.value;
    try {
      // This assumes you have a backend endpoint to handle the status update
      await axios.post(serverURL + '/api/order/updatestatus', { orderId, status }, { withCredentials: true });
      await fetchallorders(); // Refresh orders to show the new status
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchallorders();
  }, [])

  return (
    <div className=' w-[99vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white]  '>
      <Nav />
      <div className=' w-[100%] h-[100%] flex items-center lg:justify-start  justify-center '>
        <Sidebar />

        <div className=' lg:w-[85%] md:w-[70%] h-[100%] lg:ml-[310px] md:ml-[250px] mt-[70px] flex flex-col gap-[30px] overflow-hidden py-[50px] ml-[100px] '>
          <div className=' w-[400px] h-[50px] tetx-[28px] md:text-[40px] mb-[20px] text-white '>
            All Orders List
          </div>

          {
            order.map((item, idx) => (
              <div key={idx} className=' w-[95%] bg-slate-600 rounded-xl flex lg:items-center items-start justify-between lg:flex-row flex-col p-[10px] md:px-[20px] gap-[20px] '>
                <SiEbox className=' w-[60px] h-[60px] text-[black] p-[5px] rounded-lg bg-[white] ' />

                <div className='flex flex-col'>
                  {item.items.map((productItem, productIdx) => (
                    <p key={productIdx} className='text-[16px] text-[#56dbfc]'>
                      {productItem.name} x {productItem.quantity} ({productItem.size})
                    </p>
                  ))}
                </div>
                <div className='flex flex-col text-white text-[14px]'>
                  <p className='font-semibold'>{item.address.firstname} {item.address.lastname}</p>
                  <p>{item.address.street},</p>
                  <p>{item.address.city}, {item.address.state} - {item.address.pincode}</p>
                  <p>{item.address.country}</p>
                  <p className='mt-2'>{item.address.phone}</p>
                </div>

                <p className='text-white font-semibold'>Items: <span className='font-normal'>{item.items.length}</span></p>
                <p className='text-white font-semibold'>Amount: <span className='font-normal'>${item.amount}</span></p>
                <p className='text-white font-semibold'>Payment:
                  <span className={`font-normal ml-1 ${item.payment ? 'text-green-400' : 'text-yellow-400'}`}>
                    {item.payment ? "Done" : "Pending"}
                  </span>
                </p>
                <select onChange={(e) => statusHandler(e, item._id)} value={item.status} className='bg-[#3b455b] border-[1px] border-[#96eef3] text-white px-[5px] py-[10px] rounded-md  cursor-pointer'>
                  <option value="Order placed">Order placed</option>
                  <option value="packing">Packing</option>
                  <option value="shipped">Shipped</option>
                  <option value="out of delivery">Out for Delivery</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
                  
            ))
          }


        </div>

      </div>
    </div>
  )
}

export default Order