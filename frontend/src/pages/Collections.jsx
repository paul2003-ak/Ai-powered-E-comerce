import React, { useContext, useEffect, useState } from 'react'
import { FaChevronRight } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import Title from '../component/Title'
import { shopcontext } from '../context/Shopdatacontext'
import Card from '../component/Card'

const Collections = () => {
  const [showfilter, setShowfilter] = useState(false)
  const { product, search, showsearch } = useContext(shopcontext);
  const [filter, setFilter] = useState([])
  const [category, setCategory] = useState([])
  const [subcategory, setSubcategory] = useState([])
  const [sorttype, setSorttype] = useState("relavent")


  const togglecategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setCategory(prev => [...prev, e.target.value])
    }
  }
  const toggleSubecategory = (e) => {
    if (subcategory.includes(e.target.value)) {
      setSubcategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setSubcategory(prev => [...prev, e.target.value])
    }
  }

  const applyfilter = () => {
    let productcopy = product.slice();

    {/* filter base of search pannel */ }
    if (showsearch && search) {
      productcopy = productcopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }
    {/* filter base of  Men , Women , Kids */ }
    if (category.length > 0) {
      productcopy = productcopy.filter(item => category.includes(item.category));
    }
    if (subcategory.length > 0) {
      productcopy = productcopy.filter(item => subcategory.includes(item.subcategory));
    }

    setFilter(productcopy);

    let sortedCopy = [...productcopy];
    switch (sorttype) {
      case 'low-high':
        sortedCopy.sort((a, b) => a.price - b.price);
        break;
      case 'high-low':
        sortedCopy.sort((a, b) => b.price - a.price);
        break;
      default:
        // relevant - no sort
        break;
    }

    setFilter(sortedCopy);
  }


  useEffect(() => {
    setFilter(product);  // default load
  }, [product]);

  // 2️⃣ Jab category ya subcategory filter change hota hai
  useEffect(() => {
    applyfilter();  // filtering + sorting dono hoga
  }, [category, subcategory,search,showsearch]);

  // 3️⃣ Jab sorttype change hota hai (dropdown select)
  useEffect(() => {
    applyfilter();  // same logic call hoga again to re-apply sorting
  }, [sorttype , search,showsearch]);



  return (
    <div className=' w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-start flex-col md:flex-row  justify-start pt-[70px] overflow-x-hidden z-[2]  pb-[110px] ' >
      <div className={` md:w-[30vw] lg:w-[20vw] w-[100vw] md:min-h-[100vh] ${showfilter ? "h-[70vh]" : "h-[8vh]"}  p-[20px]  border-r-[1px] border-gray-400  text-[#aaf5fa] lg:fixed `}>
        <p onClick={() => setShowfilter(prev => !prev)} className=' tetx-[25px] font-semibold flex gap-[5px] items-center justify-start cursor-pointer '>
          FILTERS
          {!showfilter ? <FaChevronRight className=' text-[18px] md:hidden  ' /> : <FaChevronDown className=' text-[18px] md:hidden  ' />}
        </p>

        {/* category */}
        <div className={` border-[2px] border-[#dedcdc] pl-5  py-3 mt-6 rounded-md bg-slate-600 ${showfilter ? "" : "hidden"} md:block `}>
          <p className=' txt-[18px] text-[#f8fafa] '>
            CATEGORIES
          </p>
          <div className=' w-[230px] h-[120px] flex items-start justify-center gap-[10px] flex-col '>
            <p className=' flex items-center justify-center gap-[10px] text-[16px] font-light '>
              <input onChange={togglecategory} value={"Men"} type="checkbox" className=' w-3 ' />
              Men
            </p>

            <p className=' flex items-center justify-center gap-[10px] text-[16px] font-light '>
              <input onChange={togglecategory} type="checkbox" value={"Women"} className=' w-3 ' />
              Women
            </p>
            <p className=' flex items-center justify-center gap-[10px] text-[16px] font-light '>
              <input onChange={togglecategory} type="checkbox" value={"Kids"} className=' w-3 ' />
              Kids
            </p>
          </div>
        </div>

        {/* sub-category */}
        <div className={` border-[2px] border-[#dedcdc] pl-5  py-3 mt-6 rounded-md bg-slate-600 ${showfilter ? "" : "hidden"} md:block `}>
          <p className=' txt-[18px] text-[#f8fafa] '>
            SUB-CATEGORIES
          </p>
          <div className=' w-[230px] h-[120px] flex items-start justify-center gap-[10px] flex-col '>
            <p className=' flex items-center justify-center gap-[10px] text-[16px] font-light '>
              <input onChange={toggleSubecategory} type="checkbox" value={"Topware"} className=' w-3 ' />
              TOPWARE
            </p>

            <p className=' flex items-center justify-center gap-[10px] text-[16px] font-light '>
              <input onChange={toggleSubecategory} type="checkbox" value={"BottomWare"} className=' w-3 ' />
              BOTTOMWARE
            </p>
            <p className=' flex items-center justify-center gap-[10px] text-[16px] font-light '>
              <input onChange={toggleSubecategory} type="checkbox" value={"WinterWare"} className=' w-3 ' />
              WINTERWARE
            </p>
          </div>
        </div>

      </div>



      <div className=' lg:pl-[20%] md:py-[10px] '>
        <div className='  md:w-[80vw] w-[100vw] p-[20px] flex justify-between flex-col lg:flex-row lg:px-[50px] '>
          <Title text1={"ALL"} text2={"COLLECTIONS"} />

          <select onChange={(e) => setSorttype(e.target.value)} className=' bg-slate-600 w-[60%] md:w-[200px] h-[50px] px-[10px] text-[white] rounded-lg hover:border-[#46d1f7] border-[2px] ' name="" id="">
            <option className=' w-[100%] h-[100%] ' value="relavent">Sort By: Relavent</option>
            <option className=' w-[100%] h-[100%] ' value="low-high">Sort By: low to high</option>
            <option className=' w-[100%] h-[100%] ' value="high-low">Sort By: high to low</option>
          </select>
        </div>

        <div className=' lg:w-[80vw] md:w-[60vw] w-[100vw] min-h-[70vh] flex items-center justify-center flex-wrap gap-[30px] '>
          {
            filter.map((item, idx) => (
              <Card key={idx} id={item._id} name={item.name} price={item.price} image={item.image1} />
            ))
          }
        </div>
      </div>


    </div>
  )
}

export default Collections