import React from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { useState } from 'react'
import { useContext } from 'react'
import { authDataContext } from '../context/Authcontext'
import axios from 'axios'
import { useEffect } from 'react'
import { MdDelete } from "react-icons/md";

const List = () => {
  const [list, setList] = useState([]);
  const { serverURL } = useContext(authDataContext);


  const fetchlist = async () => {
    try {
      const response = await axios.get(serverURL + "/api/product/alllist");
      setList(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchlist();
  }, [])

  const deleteProduct = async (id) => {
    try{
      const response=await axios.post(`${serverURL}/api/product/removeproduct/${id} `,{},{withCredentials: true});
      if(response.data){
        fetchlist();
      }
      else{
        console.log("Product not deleted");
      }

    }catch(error){
      console.log(error);
    }
  }

  return (
    <div className=' w-[100vw]  min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] '>
      <Nav />
      <div className=' w-[100%] h-[100%] flex items-center justify-start '>
        <Sidebar />

        <div className=' w-[82%] h-[100%] lg:ml-[320px] md:ml-[230px] mt-[70px]  flex flex-col gap-[30px] overflow-x-hidden py-[50px] ml-[100px] '>
          <div className=' w-[400px] h-[50px] text-[2px] md:text-[40px] mb-[20px] text-white '>
            All Listed Proudcts
          </div>

          {
            list?.length > 0 ?
              (
                list.map((item, idx) => (
                  <div key={idx} className=' w-[90%] md:h-[120px] h-[90px] bg-slate-600  rounded-xl flex items-center justify-start gap-[5px] md:gap-[30px] p-[10px] md:px-[30px] '>
                    <img src={item.image1} className=' w-[30%] md:w-[120px] h-[90%] rounded-lg ' alt="" />

                    {/* product details*/}
                    <div className=' w-[90%] h-[80%] flex flex-col items-start justify-center gap-[2px] '>
                      {/* name */}
                        <div className=' w-[100%] md:text-[20px] text-[15px] text-[#bef0f3] '>
                            {item.name}
                        </div>
                        {/* category */}
                        <div className=' md:text-[17px] text-[15px] text-[#bef3da]  '>
                            {item.category}
                        </div>
                        {/* price */}
                        <div className=' md:text-[17px] text-[15px] text-[#bef3da]  '>
                            ${item.price}
                        </div>
                    </div>
                      
                      {/* delete button */}
                      <div onClick={()=>deleteProduct(item._id)} className=' w-[10%] h-[100%] bg-transparent flex items-center justify-center '>
                          <span className=' w-[35px] h-[30%] flex items-center justify-center rounded-md md:hover:bg-red-300 md:hover:text-black cursor-pointer hover:text-red-300 '>
                             <MdDelete /> </span>
                      </div>

                  </div>
                ))
              )
              : (
                <div className=' text-[20px] text-white '>
                  No products available
                </div>
              )
          }

        </div>
      </div>

    </div>
  )
}

export default List