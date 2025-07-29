import React from 'react'

import Bestseller from '../component/Bestseller'
import Latestcollection from '../component/Latestcollection'

const Product = () => {
  return (
    <div className=' w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-center justify-start flex-col py-[20px]  '>
        <div className=' w-[100%] min-h-[70px] flex items-center justify-center gap-[10px] flex-col '>
            <Latestcollection/>
        </div>
        <div className=' w-[100%] min-h-[70px] flex items-center justify-center gap-[10px] flex-col '>
            <Bestseller/>
        </div>
    </div>

  )
}

export default Product