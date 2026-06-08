import React from 'react'
import logo from '../assets/logo.png'

function Footer() {
  return (
    <div className='w-[100vw] h-[100px] bg-[#1a1517e6] backdrop-blur-xl border-t border-[#ffffff15] flex items-center justify-between px-[50px] z-50 absolute bottom-0'>
        <div className='flex items-center gap-[15px]'>
            <img src={logo} alt="Trendify" className='w-[35px] drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]' />
            <span className='text-white text-[20px] font-serif tracking-wider'>Trendify Admin Panel</span>
        </div>
        <div className='text-[#808080] text-[14px] font-medium tracking-wider'>
            Copyright © 2026 Trendify.com - All Rights Reserved
        </div>
    </div>
  )
}

export default Footer
