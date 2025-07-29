import React, { useContext, useEffect, useState } from 'react'
import Title from '../component/Title'
import { shopcontext } from '../context/Shopdatacontext'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'

const Order = () => {
    const { currency } = useContext(shopcontext)
    const { serverUrl } = useContext(authDataContext)
    const [orderdata, setOrderdata] = useState([])

    const loadorderdata = async () => {
        try {
            const result = await axios.get(serverUrl + '/api/order/userorder', { withCredentials: true });
            console.log(result.data)
            if (result.data) {
                let allorderItem = []
                result.data.map((order) => {
                    order.items.map((item) => {
                        item['status'] = order.status
                        item['payment'] = order.payment
                        item['paymentMethod'] = order.paymentMethod
                        item['date'] = order.date
                        allorderItem.push(item)

                    })
                })
                setOrderdata(allorderItem.reverse())//1st book comes in top
                console.log(allorderItem.reverse())
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadorderdata()
    }, [])

    return (
        <div className=' w-[100vw] min-h-[99vh] p-[20px] pb-[150px] overflow-hidden bg-gradient-to-l from-[#141414] to-[#0c2025] '>
            <div className=' h-[8%] w-[100%] text-center mt-[80px] '>
                <Title text1={"MY"} text2={"ORDERS"} />
            </div>
            <div className=' w-[100%] h-[92%] flex flex-wrap gap-[20px] '>
                {
                    orderdata.map((item, idx) => (
                        <div key={idx} className=' w-[100%] h-[10%] border-t border-b '>
                            <div className=' w-[100%] h-[80%] flex items-start gap-6 bg-[#51808048] py-[10px] px-[20px] rounded-2xl relative '>
                                <img src={item.image1} className=' w-[130px] h-[130px] rounded-md ' alt="" />
                                <div className=' flex items-start justify-center flex-col gap-[5px] '>
                                    <p className=' md:text-[25px] text-[20px] text-[#f3f9fc] '>{item.name}</p>
                                    <div className=' flex items-center gap-[8px] md:gap-[20px] '>
                                        <p className=' md:text-[18px] text-[12px] text-[#aaf4e7] '> {currency}{item.price}</p>
                                        <p className=' md:text-[18px] text-[12px] text-[#aaf4e7] '>Quantity: {item.quantity}</p>
                                        <p className=' md:text-[18px] text-[12px] text-[#aaf4e7] '>Size: {item.size}</p>
                                    </div>

                                    <div className=' flex items-center '>
                                        <p className=' md:text-[18px] text-[12px] text-[#aaf4e7] '>
                                            Date: <span className=' text-[#e4fbff] pl-[10px] md:text-[16px] text-[11px]'>
                                                {new Date(item.date).toDateString()}
                                            </span>
                                        </p>
                                    </div>

                                    <div className=' flex items-center  '>
                                        <p className=' md:text-[16px] text-[12px] text-[#aaf4e7] '>Payment Methos: {item.paymentMethod}</p>
                                    </div>

                                    <div className=' absolute md:left-[55%] md:top-[40%] right-[2%] top-[2%] '>
                                        <div className=' flex items-center gap-[5px] '>
                                            <p className=' min-w-2 h-2 rounded-full bg-green-500 '></p>
                                            <p className=' md:text-[17px] text-[10px] text-[#f3f6fc] '>{item.status}</p>
                                        </div>
                                    </div>

                                    <div className=' absolute md:right-[5%] right-[1%] md:top-[40%] top-[70%]'>
                                        <button onClick={loadorderdata}  className=' md:px-[15px] px-[5px] py-[3px] md:py-[7px] rounded-md bg-[#101919] text-[#f3f9fc] cursor-pointer active:bg-slate-500 '>
                                                Track Order
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Order