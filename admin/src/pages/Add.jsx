import React from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import uploadlogo from '../assets/upload_image.jpg'
import { useState } from 'react'
import { useContext } from 'react'
import { authDataContext } from '../context/Authcontext'
import axios from 'axios'
import { toast } from 'react-toastify';
import Loading from '../component/Loading'

const Add = () => {
  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("Men");
  const [price, setPrice] = useState("")
  const [subcategory, setSubcategory] = useState("Topware");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([])

  const [loading, setLoading] = useState(false);

  const {serverURL}=useContext(authDataContext);

  const submithandler=async(e)=>{
    setLoading(true);
    e.preventDefault();
    try{
      const fromdata= new FormData();
      fromdata.append("image1", image1);
      fromdata.append("image2", image2);
      fromdata.append("image3", image3);
      fromdata.append("image4", image4);
      fromdata.append("name", name);
      fromdata.append("description", description);
      fromdata.append("category", category);
      fromdata.append("price", price);
      fromdata.append("subcategory", subcategory);
      fromdata.append("bestseller", bestseller);
      fromdata.append("sizes", JSON.stringify(sizes)); 

      const response=await axios.post(serverURL + "/api/product/addproduct", fromdata, {withCredentials:true});

      console.log(response.data);
      toast.success("Product Added Successfully");
      setLoading(false);

      if(response.data){
        setName("");
        setDescription("");
        setPrice("");
        setImage1(false);
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setBestseller(false);
        setCategory("Men")
        setSubcategory("Topware")
      }
      
    }catch(error){
      console.log(error);
      setLoading(false);
      toast.error("Product Adding Failed");
    }
  }

  return (
    <div className=' w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] overflow-x-hidden relative  '>
      <Nav />
      <Sidebar />

      <div className=' w-[82%] h-[100%] flex items-center justify-start  overflow-x-hidden absolute right-0 bottom-[5%] '>
        <form  onSubmit={submithandler} action="" className=' w-[100%] md:w-[90%] h-[100%] mt-[70px] flex flex-col gap-[30px] py-[60px] px-[30px] md:px-[60px] '>
          <div className=' w-[400px] h-[50px] text-[25px] md:text-[40px] text-white '>
            Add product Page
          </div>

          {/* image upload section */}
          <div className=' w-[80%] h-[130px] flex item-start justify-center flex-col tm-[20px] gap-[10px]  '>
            <p className=' text-[20px] md:text-[25px] font-semibold '>Upload Images</p>
            <div className=' w-[100%] h-[100%] flex items-center justify-start '>

              <label htmlFor="image1" className=' w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer hover:border-[#46d1f7] '>
                <img src={!image1 ? uploadlogo : URL.createObjectURL(image1)} alt="" className=' w-[80%] h-[80%] rounded-lg shadow-2xl hover:border-[#1d1d1d] border-[2px] ' />
                <input type="file" id='image1' hidden required onChange={(e) => setImage1(e.target.files[0])} />
              </label>

              <label htmlFor="image2" className=' w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer hover:border-[#46d1f7] '>
                <img src={!image2 ? uploadlogo : URL.createObjectURL(image2)} alt="" className=' w-[80%] h-[80%] rounded-lg shadow-2xl hover:border-[#1d1d1d] border-[2px] ' />
                <input type="file" id='image2' hidden required onChange={(e) => setImage2(e.target.files[0])} />
              </label>

              <label htmlFor="image3" className=' w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer hover:border-[#46d1f7] '>
                <img src={!image3 ? uploadlogo : URL.createObjectURL(image3)} alt="" className=' w-[80%] h-[80%] rounded-lg shadow-2xl hover:border-[#1d1d1d] border-[2px] ' />
                <input type="file" id='image3' hidden required onChange={(e) => setImage3(e.target.files[0])} />
              </label>

              <label htmlFor="image4" className=' w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer hover:border-[#46d1f7] '>
                <img src={!image4 ? uploadlogo : URL.createObjectURL(image4)} alt="" className=' w-[80%] h-[80%] rounded-lg shadow-2xl hover:border-[#1d1d1d] border-[2px] ' />
                <input type="file" id='image4' hidden required onChange={(e) => setImage4(e.target.files[0])} />
              </label>


            </div>
          </div>

          {/* product details section */}
          <div className=' w-[80%] h-[100px] flex items-start justify-center flex-col gap-[10px] '>
            <p className=' text-[20px] md:text-[25px] font-semibold '> Product Name </p>
            <input value={name} onChange={(e) => setName(e.target.value)} required type="text" placeholder='Type here' className=' w-[600px] max-w-[98%] h-[40px] rounded-lg hover:border-[#46d1f7] border-[2px] cursor-pointer bg-slate-600  px-[20px] text-[18px] placeholder:text-[#ffffffc2] ' />
          </div>

          <div className=' w-[80%]  flex items-start justify-center flex-col gap-[10px] '>
            <p className=' text-[20px] md:text-[25px] font-semibold '> Product Description </p>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required type="text" placeholder='Type Description' className=' w-[600px] max-w-[98%] h-[100px] rounded-lg hover:border-[#46d1f7] border-[2px] py-[10px] cursor-pointer bg-slate-600  px-[20px] text-[18px] placeholder:text-[#ffffffc2] ' />
          </div>

          <div className=' w-[80%] flex items-center gap-[10px] flex-wrap '>
            <div className=' md:w-[30%] w-[100%] flex items-start sm:justify-center flex-col gap-[10px] '>
              <p className=' text-[20px] md:text-[25px] font-semibold w-[100%] '>Product Category</p>
              <select value={category} onChange={(e) => setCategory(e.target.value)} required name="" id="" className=' bg-slate-600 w-[60%] px-10px  py-[7px]  rounded-lg hover:border-[#46d1f7] border-[2px] '>
                <option value="Men">Men</option>
                <option value="Women">Women </option>
                <option value="Kids">Kids</option>
              </select>
            </div>

            <div className=' md:w-[30%] w-[100%] flex items-start sm:justify-center flex-col gap-[10px] '>
              <p className=' text-[20px] md:text-[25px] font-semibold w-[100%] '> Sub Category</p>
              <select value={subcategory} onChange={(e) => setSubcategory(e.target.value)} required name="" id="" className=' bg-slate-600 w-[60%] px-10px  py-[7px]  rounded-lg hover:border-[#46d1f7] border-[2px] '>
                <option value="Topware">Topware</option>
                <option value="BottomWare">BottomWare </option>
                <option value="WinterWare">WinterWare</option>
              </select>
            </div>
          </div>

          <div className=' w-[80%] h-[100px] flex items-start justify-center flex-col gap-[10px] '>
            <p className=' text-[20px] md:text-[25px] font-semibold '> Product Price </p>
            <input value={price} onChange={(e) => setPrice(e.target.value)} required type="number" placeholder='₹ 200' className=' w-[600px] max-w-[98%] h-[40px] rounded-lg hover:border-[#46d1f7] border-[2px] cursor-pointer bg-slate-600  px-[20px] text-[18px] placeholder:text-[#ffffffc2] ' />
          </div>

          { /* sizes */}
          <div className=' w-[80%] h-[220px] md:h-[100px] flex items-start justify-center flex-col gap-[10px] py-[10px] md:py-[0px] '>
            <p className=' text-[20px] md:text-25px  font-semibold'>Product Size</p>
            <div className=' flex items-center justify-start gap-[15px] flex-wrap '>

              <div onClick={() => setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"])} 
              className={` px-[20px] py-[7px] rounded-lg bg-slate-600 text-[18px] hover:border-[#46d1f7] border-[2px] cursor-pointer
              ${sizes.includes("S") ? "bg-green-400 text-black border-[#46d1f7]" : "" } `}>
                S
              </div>

              <div onClick={() => setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"])} 
              className={` px-[20px] py-[7px] rounded-lg bg-slate-600 text-[18px] hover:border-[#46d1f7] border-[2px] cursor-pointer
              ${sizes.includes("M") ? "bg-green-200 text-black border-[#46d1f7]" : "" } `}>
                M
              </div>

              <div onClick={() => setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"])} 
              className={` px-[20px] py-[7px] rounded-lg bg-slate-600 text-[18px] hover:border-[#46d1f7] border-[2px] cursor-pointer
              ${sizes.includes("L") ? "bg-green-200 text-black border-[#46d1f7]" : "" } `}>
                L
              </div>

              <div onClick={() => setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"])} 
              className={` px-[20px] py-[7px] rounded-lg bg-slate-600 text-[18px] hover:border-[#46d1f7] border-[2px] cursor-pointer
              ${sizes.includes("XL") ? "bg-green-200 text-black border-[#46d1f7]" : "" } `}>
                XL
              </div>

              <div onClick={() => setSizes(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev, "XXL"])} 
              className={` px-[20px] py-[7px] rounded-lg bg-slate-600 text-[18px] hover:border-[#46d1f7] border-[2px] cursor-pointer
              ${sizes.includes("XXL") ? "bg-green-200 text-black border-[#46d1f7]" : "" } `}>
                XXL
              </div>

            </div>
          </div>


          { /* bestseller section */}
          <div className=' w-[80%] flex items-center justify-start gap-[10px] mt-[20px] '>
                <input onChange={()=>setBestseller(prev=>!prev)} type="checkbox" id='checkbox' className=' w-[25px] h-[25px] cursor-pointer ' />
                <label htmlFor="checkbox" className=' text-[18px] md:text-[22px] font-semibold '>
                      Add to BestSeller
                </label>
          </div>

          <button className=' w-[140px] px-[20px] py-[20px] rounded-xl  bg-[#65d8f7] flex items-center justify-center gap-[10px] text-black active:bg-slate-700  active:text-white active:border-[2px] border-white '>
                {loading ? <Loading/> : "Add Product" }
          </button>
                
        </form>
      </div>
    </div>
  )
}

export default Add