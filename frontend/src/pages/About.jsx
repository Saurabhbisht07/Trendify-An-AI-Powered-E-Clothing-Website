import React from 'react'
import Title from '../component/Title'
import about from '../assets/trendify-about.jpg'
import NewLetterBox from '../component/NewLetterBox'

function About() {
  return (
    <div className='w-full min-h-screen bg-[#151113] pt-[120px] font-sans overflow-hidden'>
      
      <div className='mb-16'>
        <Title text1={'ABOUT'} text2={'TRENDIFY'}/>
      </div>

      <div className='max-w-[1200px] mx-auto px-8 md:px-16 flex flex-col lg:flex-row items-center gap-16 mb-24'>
        {/* Image Section */}
        <div className='w-full lg:w-1/2 flex justify-center relative'>
          <div className='absolute inset-0 bg-gradient-to-tr from-[#e09e86] to-transparent opacity-10 blur-3xl rounded-full'></div>
          <img src={about} alt="About Trendify" className='w-full rounded-[2rem] shadow-2xl border border-[#ffffff10] relative z-10' />
        </div>

        {/* Text Section */}
        <div className='w-full lg:w-1/2 flex flex-col gap-6 text-[#a0a0a0] text-[14px] md:text-[15px] leading-relaxed'>
          <p>
            <strong className='text-white font-serif text-[18px]'>Trendify</strong> is born for smart, seamless shopping—created to deliver high-end quality products, trending styles, and everyday essentials in one elegant place. With reliable service, fast delivery, and uncompromising value, Trendify makes your online shopping experience simple, satisfying, and stress-free.
          </p>
          <p>
             We cater to modern individuals—combining luxury, convenience, and affordability. Whether it’s fashion, lifestyle, or trends, we bring everything you need to one trusted platform with fast delivery, easy returns, and a customer-first shopping experience you’ll love.
          </p>
          
          <div className='mt-8 p-6 rounded-2xl bg-[#ffffff05] border border-[#ffffff10]'>
              <h3 className='text-[#e09e86] font-serif text-[20px] mb-3'>Our Mission</h3>
              <p>
                Our mission is to redefine online shopping by delivering quality, affordability, and supreme convenience. Trendify connects customers with curated products and trusted brands, offering a seamless, customer-focused experience that fits every lifestyle perfectly.
              </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className='w-full border-t border-[#ffffff0a] py-24 bg-[#110e10]'>
        <div className='mb-16'><Title text1={'WHY'} text2={'CHOOSE US'}/></div>
        
        <div className='max-w-[1200px] mx-auto px-8 md:px-16 grid grid-cols-1 md:grid-cols-3 gap-8'>
          
          <div className='p-10 rounded-3xl bg-[#ffffff05] border border-[#ffffff10] group hover:bg-[#ffffff0a] transition-colors'>
            <h4 className='text-white font-serif text-[20px] mb-4 group-hover:text-[#e09e86] transition-colors'>Quality Assurance</h4>
            <p className='text-[#808080] text-[14px] leading-relaxed'>
                We guarantee quality through strict checks, reliable sourcing, and a rigorous commitment to customer satisfaction always.
            </p>
          </div>
          
          <div className='p-10 rounded-3xl bg-[#ffffff05] border border-[#ffffff10] group hover:bg-[#ffffff0a] transition-colors'>
            <h4 className='text-white font-serif text-[20px] mb-4 group-hover:text-[#e09e86] transition-colors'>Convenience</h4>
            <p className='text-[#808080] text-[14px] leading-relaxed'>
             Shop effortlessly with fast delivery, simple navigation, secure checkout, and everything you need in one luxury place.
            </p>
          </div>
          
          <div className='p-10 rounded-3xl bg-[#ffffff05] border border-[#ffffff10] group hover:bg-[#ffffff0a] transition-colors'>
            <h4 className='text-white font-serif text-[20px] mb-4 group-hover:text-[#e09e86] transition-colors'>Exceptional Service</h4>
            <p className='text-[#808080] text-[14px] leading-relaxed'>
              Our dedicated premium support team ensures quick responses, helpful solutions, and a perfectly smooth shopping experience.
            </p>
          </div>

        </div>
      </div>
      
      <NewLetterBox/>
      
    </div>
  )
}

export default About
