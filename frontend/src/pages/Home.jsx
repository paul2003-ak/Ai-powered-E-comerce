import React, { useEffect, useState } from 'react'
import Background from '../component/Background';
import Hero from '../component/Hero';
import Product from './Product';
import Ourpolicy from '../component/Ourpolicy';
import NewLetterbox from '../component/NewLetterbox';
import Footer from '../component/Footer';

const Home = () => {
  const herodata = [
    { text1: "30% oFFF Limited Offer", text2: "Style that" },
    { text1: "Discover the Best of Bold Fashion", text2: "Limited Time Only!" },
    { text1: "Explore Our Best Collection", text2: "Shop Now!" },
    { text1: "Chose Your Perfect Fashion Fit", text2: "Now On Sale!" }
  ]

  const [herocount, setHerocount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHerocount(prev => (prev === 3 ? 0 : prev + 1))
    }, 3000);
    return () => clearInterval(interval)
  }, [])

  return (
    <div className=' overflow-x-hidden  relative top-[70px]'>
      <div className='w-[100vw] lg:h-[100vh] md:h-[50vh] sm:h-[30vh] bg-gradient-to-l from-[#141414] to-[#0c2025]'>
        <Background herocount={herocount} />
        <Hero herocount={herocount} setHerocount={setHerocount} herodata={herodata[herocount]} />
      </div>

        <Product/>
        <Ourpolicy/>
        <NewLetterbox/>
        <Footer/>
    </div>
  )
}

export default Home