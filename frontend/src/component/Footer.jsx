import React from 'react'
import logo from "../assets/logo.png"
import { useNavigate } from 'react-router-dom'

function Footer() {
  let navigate = useNavigate()

  return (
    <footer className='w-full bg-[#151113e6] backdrop-blur-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)] border-t border-[#ffffff10] pt-16 pb-24 md:pb-8 relative z-20'>
        <div className='max-w-[1200px] mx-auto px-8 md:px-16 flex flex-col md:flex-row gap-12 justify-between'>
            
            {/* Brand Section */}
            <div className='w-full md:w-1/3 flex flex-col gap-6'>
                <div className='flex items-center gap-3 cursor-pointer' onClick={() => navigate("/")}>
                    <img src={logo} alt="Trendify"  className='w-[35px] drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]'/>
                    <span className='text-[24px] text-white font-serif tracking-wider'>Trendify</span>
                </div>
                <p className='text-[#808080] text-[14px] leading-relaxed max-w-[300px]'>
                    Curated fashion for the modern individual. Experience premium quality, seamless delivery, and unparalleled style effortlessly.
                </p>
            </div>

            {/* Links Section */}
            <div className='w-full md:w-1/4 flex flex-col gap-6'>
                <h3 className='text-[#e09e86] text-[12px] font-bold tracking-[0.2em] uppercase'>Company</h3>
                <ul className='flex flex-col gap-3'>
                    <li className='text-[#a0a0a0] text-[14px] hover:text-white cursor-pointer transition-colors' onClick={()=>navigate("/")}>Home</li>
                    <li className='text-[#a0a0a0] text-[14px] hover:text-white cursor-pointer transition-colors' onClick={()=>navigate("/about")}>About us</li>
                    <li className='text-[#a0a0a0] text-[14px] hover:text-white cursor-pointer transition-colors'>Delivery</li>
                    <li className='text-[#a0a0a0] text-[14px] hover:text-white cursor-pointer transition-colors'>Privacy Policy</li>
                </ul>
            </div>

            {/* Contact Section */}
            <div className='w-full md:w-1/4 flex flex-col gap-6'>
                <h3 className='text-[#e09e86] text-[12px] font-bold tracking-[0.2em] uppercase'>Get in Touch</h3>
                <ul className='flex flex-col gap-3'>
                    <li className='text-[#a0a0a0] text-[14px]'>Tel: 9761######</li>
                    <li className='text-[#a0a0a0] text-[14px] cursor-pointer hover:text-white transition-colors'>souravbst007@gmail.com</li>
                    <li className='text-[#a0a0a0] text-[14px] hidden md:block'>12345 SRV COLLECTION MUKHANI</li>
                    <li className='text-[#a0a0a0] text-[14px] hidden md:block cursor-pointer hover:text-white transition-colors'>HALDWANI, INDIA</li>
                </ul>
            </div>

        </div>

        {/* Divider */}
        <div className='w-full max-w-[1200px] mx-auto px-8 md:px-16 mt-16 mb-8'>
            <div className='w-full h-[1px] bg-[#ffffff10]'></div>
        </div>

        {/* Copyright */}
        <div className='w-full text-center pb-24 md:pb-0'>
            <p className='text-[#606060] text-[12px] font-medium tracking-wider'>
                Copyright © 2026 Trendify.com - All Rights Reserved
            </p>
        </div>
      
    </footer>
  )
}

export default Footer
