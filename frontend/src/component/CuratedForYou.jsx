import React, { useContext, useEffect, useState } from 'react'
import { shopDataContext } from '../context/ShopContext'
import Title from './Title'
import Card from './Card'

function CuratedForYou() {
    const { products } = useContext(shopDataContext)
    const [curatedProducts, setCuratedProducts] = useState([])

    useEffect(() => {
        try {
            const preferences = JSON.parse(localStorage.getItem('trendify_preferences'))
            if (!preferences || Object.keys(preferences).length === 0) return;
            
            // Find top preference
            const entries = Object.entries(preferences)
            entries.sort((a, b) => b[1] - a[1]) // Sort by count descending
            const topPreference = entries[0][0] // String (e.g. 'Men', 'Topwear')
            
            // Filter products matching this top preference
            const matches = products.filter(item => 
                item.category === topPreference || item.subCategory === topPreference
            )
            
            // Shuffle and pick 5
            setCuratedProducts(matches.sort(() => Math.random() - 0.5).slice(0, 5))
            
        } catch(e) {}
    }, [products])

    if(curatedProducts.length === 0) return null;

  return (
    <div className='my-10 max-w-[1400px] mx-auto px-8 relative overflow-hidden'>
      {/* Background ambient glow */}
      <div className='absolute top-0 right-1/4 w-64 h-64 bg-[#e09e86] opacity-10 blur-[100px] rounded-full pointer-events-none'></div>
      
      <div className='text-center py-8 flex flex-col items-center justify-center text-3xl relative z-10'>
          <h2 className='text-[#e09e86] text-sm uppercase tracking-[0.3em] font-bold mb-4 flex items-center gap-2'>
              <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              Smart AI Engine
          </h2>
          <Title text1={"curated for"} text2={"you"} />
          <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-[#a0a0a0] mt-4 tracking-wide'>
              Based on your unique style profile & secure history, we think you'll love these items.
          </p>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-10 pt-8 relative z-10'>
        {
          curatedProducts.map((item, index) => (
            <Card key={index} id={item._id} image={item.image1} name={item.name} price={item.price} />
          ))
        }
      </div>
    </div>
  )
}

export default CuratedForYou
