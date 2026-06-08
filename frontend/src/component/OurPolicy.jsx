import React from 'react'
import Title from './Title'
import { RiExchangeFundsLine } from "react-icons/ri";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";

function OurPolicy() {
  return (
    <div className='w-full bg-[#151113] py-24 px-8 md:px-16 flex flex-col items-center border-t border-[#ffffff0a]'>
        
        <div className='text-center mb-20'>
            <h3 className='text-[#e09e86] text-[12px] font-bold tracking-[0.2em] uppercase mb-4'>Trust & Safety</h3>
            <h2 className='text-[40px] md:text-[50px] font-serif text-white leading-tight'>
                <span className='font-light italic text-[#e09e86]'>Our</span> Policy
            </h2>
            <p className='text-[#808080] text-[14px] max-w-[600px] mx-auto mt-4'>
                Customer-Friendly Policies – Committed to Your Satisfaction and Safety.
            </p>
        </div>

      <div className='w-full max-w-[1200px] flex flex-wrap justify-center gap-10 md:gap-16'>
        
        {/* Policy 1 */}
        <div className='flex-1 min-w-[280px] max-w-[350px] p-8 rounded-2xl bg-[#ffffff05] border border-[#ffffff10] flex flex-col items-center text-center group hover:bg-[#ffffff0a] transition-colors'>
            <div className='w-16 h-16 rounded-full bg-[#e09e8615] flex items-center justify-center mb-6 text-[#e09e86] group-hover:scale-110 transition-transform'>
                <RiExchangeFundsLine size={30}/>
            </div>
            <h4 className='text-white text-[18px] font-serif mb-3'>Easy Exchange</h4>
            <p className='text-[#808080] text-[14px] leading-relaxed'>Exchange Made Easy – Quick, Simple, and Customer-Friendly Process.</p>
        </div>

        {/* Policy 2 */}
        <div className='flex-1 min-w-[280px] max-w-[350px] p-8 rounded-2xl bg-[#ffffff05] border border-[#ffffff10] flex flex-col items-center text-center group hover:bg-[#ffffff0a] transition-colors'>
            <div className='w-16 h-16 rounded-full bg-[#e09e8615] flex items-center justify-center mb-6 text-[#e09e86] group-hover:scale-110 transition-transform'>
                <TbRosetteDiscountCheckFilled size={30}/>
            </div>
            <h4 className='text-white text-[18px] font-serif mb-3'>7 Days Return</h4>
            <p className='text-[#808080] text-[14px] leading-relaxed'>Shop with Confidence – 7 Days Easy Return Guarantee.</p>
        </div>

        {/* Policy 3 */}
        <div className='flex-1 min-w-[280px] max-w-[350px] p-8 rounded-2xl bg-[#ffffff05] border border-[#ffffff10] flex flex-col items-center text-center group hover:bg-[#ffffff0a] transition-colors'>
            <div className='w-16 h-16 rounded-full bg-[#e09e8615] flex items-center justify-center mb-6 text-[#e09e86] group-hover:scale-110 transition-transform'>
                <BiSupport size={30}/>
            </div>
            <h4 className='text-white text-[18px] font-serif mb-3'>24/7 Support</h4>
            <p className='text-[#808080] text-[14px] leading-relaxed'>Trusted Customer Support – Your Satisfaction Is Our Priority.</p>
        </div>

      </div>
    </div>
  )
}

export default OurPolicy
