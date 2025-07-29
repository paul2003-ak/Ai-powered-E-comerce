import React, { useContext, useState } from 'react'
import Title from '../component/Title'
import CartTotal from '../component/CartTotal'
import razorpay from '../assets/Razorpay-Logo.jpg'
import { shopcontext } from '../context/Shopdatacontext'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Placeorder = () => {
  const navigate = useNavigate();
  const { cartItem, setCartItem, product, getCartAmount, delivery_fee } = useContext(shopcontext)
  const { serverUrl } = useContext(authDataContext)
  const [method, setMethod] = useState('cod')

  const [formdata, setFormdata] = useState({
    firstname: '',
    lastname: '',
    email: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
    phone: ''
  })

  const onchangehandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormdata(data => ({ ...data, [name]: value }))
  }


  //RAZORPAY INTEGRATION
  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order.orderId,
      receipt: order.receipt,
      handler: async (response) => {
        // Just send razorpay_order_id to backend
        try {
          const { data } = await axios.post(
            serverUrl + '/api/order/verifyrazorpay',
            { razorpay_order_id: response.razorpay_order_id },
            { withCredentials: true }
          );

          if (data.message === 'Payment verified ✅') {
            toast.success("Payment successful!");
            navigate('/order');
            setCartItem({});
          } else {
            toast.error("Payment verification failed!");
          }
        } catch (error) {
          console.error(error);
          toast.error("Something went wrong verifying payment.");
        }
      }
    }
    const rzp = new window.Razorpay(options);
    rzp.open();
  }



  const submithandler = async (e) => {
    e.preventDefault()

    try {
      let orderItem = []
      for (const items in cartItem) {
        for (const size in cartItem[items]) {
          if (cartItem[items][size] > 0) {
            const iteminfo = structuredClone(product.find(product => product._id === items))
            if (iteminfo) {
              iteminfo.size = size
              iteminfo.quantity = cartItem[items][size]
              orderItem.push(iteminfo)
            }
          }
        }
      }
      let orderData = {
        address: formdata,
        items: orderItem,
        amount: getCartAmount() + delivery_fee
      }

      switch (method) {
        case 'cod': {
          const result = await axios.post(serverUrl + '/api/order/placeorder', orderData, { withCredentials: true });

          if (result.data) {
            toast.success("Order placed successfully!");
            setCartItem({});
            navigate('/order');
          } else {
            toast.error("Failed to place order.");
          }
          break;
        }

        case 'razorpay': {
          const result = await axios.post(serverUrl + '/api/order/razorpay', orderData, { withCredentials: true });
          if (result.data) {
            initPay(result.data);
          }
          break;
        }

        default:
          break;
      }


    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again.");
    }
  }



  return (
    <div className=' w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-center justify-center flex-col md:flex-row gap-[50px] relative '>
      <div className=' lg:w-[50%] w-[100%] h-[100%] flex items-center justify-center lg:mt-[0px] mt-[90px] '>
        <form onSubmit={submithandler} className=' lg:w-[70%] w-[95%] lg:h-[70%] h-[100%] ' action="">
          <div className=' py-[10px] '>
            <Title text1={"DELIVERY"} text2={"INFORMATION"} />
          </div>
          <div className=' w-[100%] h-[70px] flex items-center justify-between px-[10px] '>
            <input onChange={onchangehandler} name='firstname' value={formdata.firstname} type="text" placeholder='First name' className=' w-[48%] h-[50px] rounded-md bg-slate-700 text-white placeholder:text-[white] text-[18px] px-[20px] shadow-sm shadow-[#343434]' required />
            <input onChange={onchangehandler} name='lastname' value={formdata.lastname} type="text" placeholder='Last name' className=' w-[48%] h-[50px] rounded-md bg-slate-700 text-white placeholder:text-[white] text-[18px] px-[20px] shadow-sm shadow-[#343434]' required />
          </div>

          <div className=' w-[100%] h-[70px] flex items-center justify-between px-[10px] '>
            <input onChange={onchangehandler} name='email' value={formdata.email} type="email" placeholder='Email address' className=' w-[100%] text-white h-[50px] rounded-md shadow-sm shadow-[#343434] bg-slate-700 placeholder:text-[white] text-[18px] px-[20px]' required />
          </div>

          <div className=' w-[100%] h-[70px] flex items-center justify-between px-[10px] '>
            <input onChange={onchangehandler} name='street' value={formdata.street} type="text" placeholder='Street' className=' w-[100%] text-white h-[50px] rounded-md shadow-sm shadow-[#343434] bg-slate-700 placeholder:text-[white] text-[18px] px-[20px]' required />
          </div>

          <div className=' w-[100%] h-[70px] flex items-center justify-between px-[10px] '>
            <input onChange={onchangehandler} name='city' value={formdata.city} type="text" placeholder='City' className=' w-[48%] h-[50px] text-white rounded-md shadow-sm shadow-[#343434] bg-slate-700 placeholder:text-[white] text-[18px] px-[20px]' required />
            <input onChange={onchangehandler} name='state' value={formdata.state} type="text" placeholder='State' className=' w-[48%] h-[50px] text-white rounded-md shadow-sm shadow-[#343434] bg-slate-700 placeholder:text-[white] text-[18px] px-[20px]' required />
          </div>

          <div className=' w-[100%] h-[70px] flex items-center justify-between px-[10px] '>
            <input onChange={onchangehandler} name='pincode' value={formdata.pincode} type="text" placeholder='Pincode' className=' w-[48%] h-[50px] text-white rounded-md shadow-sm shadow-[#343434] bg-slate-700 placeholder:text-[white] text-[18px] px-[20px]' required />
            <input onChange={onchangehandler} name='country' value={formdata.country} type="text" placeholder='Country' className=' w-[48%] h-[50px] text-white rounded-md shadow-sm shadow-[#343434] bg-slate-700 placeholder:text-[white] text-[18px] px-[20px]' required />
          </div>

          <div className=' w-[100%] h-[70px] flex items-center justify-between px-[10px] '>
            <input onChange={onchangehandler} name='phone' value={formdata.phone} type="text" placeholder='Phone' className=' w-[100%] h-[50px] text-white rounded-md shadow-sm shadow-[#343434] bg-slate-700 placeholder:text-[white] text-[18px] px-[20px]' required />
          </div>

          <div>
            <button type='submit' className='text-[18px] active:bg-slate-500 cursor-pointer bg-[#3bcee848] py-[10px] px-[50px] rounded-2xl  text-white flex items-center justify-center gap-[20px] absolute lg:right-[20%] bottom-[10%] right-[35%] border-[1px] border-[#80808049] ml-[30px] mt-[20px]'>
              PLACE ORDER
            </button>
          </div>

        </form>
      </div>

      {/* payment form */}
      <div className=' lg:w-[50%] w-[100%] min-h-[100%] flex items-center justify-center gap-[30px] '>
        <div className=' lg:w-[70%] w-[90%] lg:h-[70%] h-[100%] flex items-center justify-center gap-[10px flex-col '>
          <CartTotal />
          <div className=' py-[10px] '>
            <Title text1={"PAYMENT"} text2={"METHOD"} />
          </div>

          <div className=' w-[100%] h-[30vh] lg:h-[100px] flex items-start mt-[20px] lg:mt-[0px] justify-center gap-[50px] '>

            {/* razorpay */}
            <button
              onClick={() => setMethod('razorpay')}
              className={`w-[150px] h-[50px] rounded-sm ${method === 'razorpay' ? 'border-[5px] border-blue-900 rounded-sm' : ''}`}
            >
              <img
                src={razorpay}
                className="w-[100%] h-[100%] object-fill rounded-sm"
                alt=""
              />
            </button>

            {/* cash on delivery */}
            <button
              onClick={() => setMethod('cod')}
              className={`w-[200px] h-[50px] bg-gradient-to-t from-[#95b3f8] to-[white] text-[14px] px-[20px] rounded-sm text-[#332f6f] font-bold ${method === 'cod' ? 'border-[5px] border-blue-900 rounded-sm' : ''}`}
            >
              CASH ON DELIVERY
            </button>

          </div>

        </div>
      </div>


    </div>
  )
}

export default Placeorder