import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { shopcontext } from '../context/Shopdatacontext';
import { FaStar } from "react-icons/fa6";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import Title from '../component/Title';
import Relatedproduct from '../component/Relatedproduct';

const ProductDetails = () => {
    const { id } = useParams();
    const { product, currency, addtocart } = useContext(shopcontext);
    const [productdata, setProductdata] = useState(false)


    const [image, setImage] = useState("")
    const [image1, setImage1] = useState('')
    const [image2, setImage2] = useState('')
    const [image3, setImage3] = useState('')
    const [image4, setImage4] = useState('')
    const [size, setSize] = useState('')


    const fetchproductdata = async () => {
        product.map((item) => {
            if (item._id === id) {
                setProductdata(item);

                setImage1(item.image1)
                setImage2(item.image2)
                setImage3(item.image3)
                setImage4(item.image4)
                setImage(item.image1)

                return null;
            }
        })
    }

    useEffect(() => {
        fetchproductdata();
    }, [id, product])


    return (
        productdata ? (
            <div>
                <div className=' lg:w-[100vw] w-[100vw] h-[130vh] md:h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-center justify-start flex-col lg:flex-row gap-[20px] '>
                    <div className=' lg:w-[50vw] md:w-[90vw] lg:h-[90vh] h-[50vh] mt-[70px] flex items-center justify-center md:gap-[10px] gap-[30px] flex-col-reverse lg:flex-row '>
                        <div className=' lg:w-[20%] md:w-[80%] h-[10%] lg:h-[80%] flex items-center justify-center gap-[50px] lg:gap-[20px] lg:flex-col flex-wrap '>

                            <div onClick={() => setImage(image1)} className=' md:w-[100px] w-[50px] h-[50px] md:h-[110px] bg-slate-300 border-[1px] border-[#80808049] rounded-md '>
                                <img src={image1} alt="" className=' w-[100%] h-[100%] cursor-pointer ' />
                            </div>

                            <div onClick={() => setImage(image2)} className=' md:w-[100px] w-[50px] h-[50px] md:h-[110px] bg-slate-300 border-[1px] border-[#80808049] rounded-md '>
                                <img src={image2} alt="" className=' w-[100%] h-[100%] cursor-pointer ' />
                            </div>


                            <div onClick={() => setImage(image3)} className=' md:w-[100px] w-[50px] h-[50px] md:h-[110px] bg-slate-300 border-[1px] border-[#80808049] rounded-md '>
                                <img src={image3} alt="" className=' w-[100%] h-[100%] cursor-pointer ' />
                            </div>

                            <div onClick={() => setImage(image4)} className=' md:w-[100px] w-[50px] h-[50px] md:h-[110px] bg-slate-300 border-[1px] border-[#80808049] rounded-md '>
                                <img src={image4} alt="" className=' w-[100%] h-[100%] cursor-pointer ' />
                            </div>

                        </div>

                        {/* image set */}
                        <div className=' lg:w-[69%] w-[80%] lg:h-[78%] h-[70%] border-[1px] border-[#80808049] ronded-md overflow-hidden '>
                            <img src={image} alt="" className=' w-[100%] lg:h-[100%] h-[100%] text-[30px] text-white text-center rounded-md object-fill ' />
                        </div>
                    </div>

                    <div className=' lg:w-[50vw] w-[100vw] lg:h-[75vh] h-[40vh] lg:mt-[80px] items-start justify-start flex-col py-[20px] px-[30px] md-[pb-[20px] md:pl-[20px] lg:pl-[0px] lg:px-[0px] lg:py-[0px] gap-[10px] '>
                        <h1 className=' text-[40px] font-semibold text-[aliceblue] '>{productdata.name.toUpperCase()}</h1>
                        <div className=' flex items-center gap-1 '>
                            <FaStar className=' text-[20px] fill-[#FFD700] ' />
                            <FaStar className=' text-[20px] fill-[#FFD700] ' />
                            <FaStar className=' text-[20px] fill-[#FFD700] ' />
                            <FaStar className=' text-[20px] fill-[#FFD700] ' />
                            <FaRegStarHalfStroke className=' text-[20px] fill-[#FFD700] ' />

                            <p className=' text-[18px] font-semibold pl-[5px] text-[white] '> (124) </p>
                        </div>
                        <p className=' text-[30px] font-semibold pl-[5px] text-[white] '>{currency} {productdata.price}</p>
                        <p className=' w-[80%] md:w-[50%] tetx-[20px] font-semibold pl-[5px] text-[white] '>{productdata.description} and Stylish , breathable cotton shirt with a modern slim fit. Easy to wash , super comfortable , and designed for effortless style.</p>

                        <div className=' flex flex-col gap-[10px] my-[20px] '>
                            <Title text1={"SELECT"} text2={"SIZE"} />
                            <div className=' flex gap-2 '>
                                {
                                    productdata.sizes.map((item, idx) => (
                                        <button key={idx} className={`border py-2 px-4 bg-slate-300 rounded-md ${item === size ? 'bg-black text-[#4fa6f1] text-[20px]' : ''} `}
                                            onClick={() => setSize(item)} > {item}</button>
                                    ))
                                }
                            </div>
                            <button onClick={()=>addtocart(productdata._id , size)} className=' w-[50%] text-[16px] active:bg-slate-500 cursor-pointer bg-[#495b61c9] py-[10px] px-[20px] rounded-2xl mt-[10px] border-[1px] border-[#80808049] text-white shadow-md shadow-black  '>
                                Add To Cart
                            </button>
                        </div>

                        <div className=' w-[90%] h-[1px]  bg-slate-700 '></div>
                        <div className=' w-[80%] text-[16px]  text-white '>
                            <p>100% Original Product</p>
                            <p>Cash On delivery is available on this product</p>
                            <p>East return and exchange policy within 7 days</p>
                        </div>

                    </div>
                </div>

                <div className=' w-[100%] min-h-[70vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-start justify-start flex-col '>
                    <div className=' flex px-[20px] lg:ml-[80px] ml-[0px] lg:mt-[0px] '>
                        <p className=' border px-5 py-3 text-sm text-white '>Description</p>
                        <p className=' border px-5 py-3 text-sm text-white '>Review (124)</p>
                    </div>
                    <div className=' w-[80%] md:h-[150px] h-[220px] bg-[#3336397c] border text-white text-[13px] md:text-[15px] lg:text-[20px] px-[10px] md:px-[30px] lg:ml-[100px] ml-[20px] '>
                        <p className=' w-[95%] h-[90%] flex items-center justify-center '>
                            Upgrade your wardrobe with this stylish slim-fit cutton shirt, available now on AiOneCart . Crafted from breathable , high-quality  fabric , it offers all-day comfort and effortless style. Easy to maintain and perfect for any setting , this shirt is a must-have essential from those who value both fashion and function .
                        </p>
                    </div>

                    <Relatedproduct category={productdata.category} subcategory={productdata.subcategory} currentproductId={productdata._id} />
                </div>

            </div>
        ) : (
            <div className=' opacity-0 '></div>
        )

    )
}

export default ProductDetails