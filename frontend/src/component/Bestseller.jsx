import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { shopcontext } from '../context/Shopdatacontext'
import Card from './Card'

const Bestseller = () => {
  const {product}=useContext(shopcontext)
  const [bestseller, setBestseller] = useState([])

  useEffect(()=>{
    const filterdProduct=product.filter((item)=>item.bestseller);
    setBestseller(filterdProduct.slice(0,4));
  },[product])


  return (
    <div>
      <div className=' h[8%] w-[100%] text-center mt-[50px]  '>
        <Title text1={"BEST"} text2={"SELLER"} />
        <p className=' w-[100%] m-auto text-[13px] md:text-[20px] px-[10px] text-blue-100 '>
          Tried, Tested, Loved Discover Our All-Time Best Selers.
        </p>
      </div>

      <div className=' w-[100%] h-[50%] mt-[30px] flex items-center justify-center flex-wrap gap-[50px] '>
          {
            bestseller.map((item,idx)=>(
              <Card key={idx} name={item.name} image={item.image1} id={item._id} price={item.price} />
            ))
          }
      </div>

    </div>

  )
}

export default Bestseller