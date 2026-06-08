import React, { useEffect, useState } from 'react'
import Backgound from '../component/Backgound'
import Hero from '../component/Hero'
import Product from './Product'
import OurPolicy from '../component/OurPolicy'
import NewLetterBox from '../component/NewLetterBox'
import Footer from '../component/Footer'


function Home() {
  let heroData=[
    {text1:"30% OFF Limited Offer",text2:"Style that Speaks"},
    {text1:"Discover Bold Fashion",text2:"Limited Time Only"},
    {text1:"Explore Our Collection",text2:"Shop Now!"},
    {text1:"Find your Perfect Fit",text2:"Exclusive Range"}
  ]

  let [heroCount,setHeroCount] = useState(0)

  useEffect(()=>{
    let interval = setInterval(()=>{
      setHeroCount(prevCount => (prevCount === 3 ? 0 : prevCount + 1));
    },5000);
    return () => clearInterval(interval)
  },[])
  
  return (
    <div className='bg-[#110e10] min-h-screen pt-[80px] font-sans'>
        <div className='w-full h-[85vh] relative overflow-hidden'>
            <Backgound heroCount={heroCount}/>
            <Hero
                heroCount={heroCount}
                setHeroCount={setHeroCount}
                heroData={heroData[heroCount]}
            />
        </div>

        {/* Global Products Wrapper */}
        <div className='relative z-10 bg-[#151113]'>
            <Product/>
            <OurPolicy/>
            <NewLetterBox/>
        </div>
        
        <Footer/>
    </div>
  )
}

export default Home
