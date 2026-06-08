import React from 'react'

function Hero({heroData,heroCount,setHeroCount}) {
  return (
    <div className='w-full h-full relative z-10 flex flex-col justify-center px-8 md:px-24' >
        <div className='max-w-[750px] mt-16'>
            <h3 className='text-[#e09e86] text-[12px] font-bold tracking-[0.2em] mb-6 uppercase flex items-center gap-4'>
                <span className='w-12 h-[1px] bg-[#e09e86]'></span>
                {heroData.text2}
            </h3>
            <h1 className='text-[55px] md:text-[75px] lg:text-[90px] leading-[1.05] font-serif text-white mb-10 drop-shadow-2xl'>
                {heroData.text1}
            </h1>
            <button className='bg-gradient-to-r from-[#d97d66] to-[#e4ac7a] hover:opacity-90 text-white px-8 py-4 rounded-lg text-[13px] font-bold tracking-[0.15em] uppercase transition-all shadow-lg hover:shadow-2xl hover:-translate-y-1'>
                Discover Collection
            </button>
        </div>

        {/* Custom Slide Indicators */}
        <div className='absolute bottom-12 left-8 md:left-24 flex items-center gap-4 '>
            {[0,1,2,3].map(index => (
                <div key={index} className={`h-[2px] cursor-pointer transition-all duration-500 ${heroCount === index ? "w-16 bg-[#e09e86]" : "w-8 bg-[#ffffff40] hover:bg-white"}`} onClick={()=>setHeroCount(index)}></div>
            ))}
        </div>
    </div>
  )
}

export default Hero
