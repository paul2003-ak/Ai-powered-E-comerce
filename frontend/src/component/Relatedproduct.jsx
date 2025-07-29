import React, { useContext, useEffect, useState } from 'react'
import { shopcontext } from '../context/Shopdatacontext'
import Title from './Title';
import Card from './Card'

const Relatedproduct = ({category, subcategory, currentproductId}) => {
    const {product}=useContext(shopcontext);
    const [related, setRelated] = useState([])


    useEffect(()=>{
        if(product.length > 0){
            let productcopy=product.slice()
            productcopy=productcopy.filter((item)=>category === item.category)
            productcopy=productcopy.filter((item)=>subcategory === item.subcategory)

            productcopy=productcopy.filter((item)=>currentproductId !== item._id)
            setRelated(productcopy.slice(0,4))
        }
    },[product, category,subcategory,currentproductId])


  return (
    <div className=' my-[130px] md:my-[40px] md:px-[60px] '>
        <div className=' ml-[20px] lg:ml-[80px] '>
                <Title text1={'RELATED'} text2={"PRODUCT"}  />
        </div>
        <div className=' w-[100%] mt-[30px] flex items-center justify-center flex-wrap gap-[50px] '>
                {
                    related.map((item,idx)=>(
                        <Card key={idx} id={item._id} name={item.name} price={item.price} image={item.image1} />
                    ))
                }
        </div>
    </div>
  )
}

export default Relatedproduct