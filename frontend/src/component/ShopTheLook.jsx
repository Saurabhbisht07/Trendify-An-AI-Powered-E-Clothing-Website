import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Title from './Title'

function ShopTheLook() {
  const navigate = useNavigate()
  const [activeHotspot, setActiveHotspot] = useState(null)

  const hotspots = [
    {
      id: 1,
      top: '35%',
      left: '42%',
      name: 'Oversized Blazer',
      price: '2499',
      category: 'Topwear'
    },
    {
      id: 2,
      top: '65%',
      left: '52%',
      name: 'Wide Leg Trousers',
      price: '1899',
      category: 'Bottomwear'
    },
    {
      id: 3,
      top: '90%',
      left: '48%',
      name: 'Chunky Loafers',
      price: '2999',
      category: 'Footwear'
    }
  ]

  return (
    <div className='w-full bg-[#110e10] py-24'>
      <div className='max-w-[1400px] mx-auto px-8'>
        <div className='text-center flex flex-col items-center justify-center text-3xl mb-12'>
            <h2 className='text-[#e09e86] text-sm uppercase tracking-[0.3em] font-bold mb-4 flex items-center gap-2'>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                Interactive Guide
            </h2>
            <Title text1={"shop"} text2={"the look"} />
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-400 mt-2 tracking-wide'>
                Hover over the pulsing points to discover and shop individual pieces from our curated lookbook.
            </p>
        </div>

        <div className='w-full max-w-[800px] mx-auto aspect-[3/4] md:aspect-[16/10] relative rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.05)] border border-[#ffffff10]'>
            {/* Cinematic Background Image */}
            <img 
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=2000" 
                alt="Fashion Lookbook" 
                className='w-full h-full object-cover object-center filter brightness-75'
            />
            
            {/* Ambient Vignette */}
            <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none'></div>

            {/* Hotspots */}
            {hotspots.map((spot) => (
                <div 
                    key={spot.id}
                    className='absolute z-20 group'
                    style={{ top: spot.top, left: spot.left, transform: 'translate(-50%, -50%)' }}
                    onMouseEnter={() => setActiveHotspot(spot.id)}
                    onMouseLeave={() => setActiveHotspot(null)}
                >
                    {/* The Dot */}
                    <div className='relative w-6 h-6 flex justify-center items-center cursor-pointer'>
                        <div className={`absolute w-full h-full bg-white rounded-full ${activeHotspot === spot.id ? 'scale-125' : 'animate-ping opacity-75'} transition-transform duration-300`}></div>
                        <div className='absolute w-2 h-2 bg-black rounded-full'></div>
                    </div>

                    {/* The Tooltip Panel */}
                    <div className={`absolute left-1/2 bottom-full mb-4 -translate-x-1/2 w-48 bg-[#151113]/95 backdrop-blur-md border border-[#ffffff20] p-4 rounded-2xl shadow-2xl transition-all duration-300 origin-bottom pointer-events-none ${activeHotspot === spot.id ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-2'}`}>
                        <div className='absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#151113] border-b border-r border-[#ffffff20] rotate-45'></div>
                        <h4 className='text-white text-sm font-bold mb-1'>{spot.name}</h4>
                        <p className='text-[#e09e86] font-serif text-xs font-bold mb-3'>₹ {spot.price}</p>
                        <button 
                            onClick={(e) => { e.stopPropagation(); navigate('/collection'); }}
                            className='w-full bg-white text-black py-2 rounded-lg text-[10px] font-bold tracking-widest uppercase hover:bg-[#e09e86] hover:text-white transition-colors pointer-events-auto'
                        >
                            Shop Item
                        </button>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default ShopTheLook
