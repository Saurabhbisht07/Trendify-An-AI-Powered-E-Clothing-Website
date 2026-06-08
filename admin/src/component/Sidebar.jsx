import React from 'react'
import { IoIosAddCircleOutline, IoMdAnalytics } from "react-icons/io";
import { FaRegListAlt, FaUserTie } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";
import { useNavigate } from 'react-router-dom';

function Sidebar() {
    let navigate = useNavigate()
  return (
    <div className='w-[18%] min-h-[100vh] border-r-[1px] py-[60px] fixed left-0 top-0'>
        <div className='flex flex-col gap-6 pt-[40px] pl-[15%] text-[17px] font-bold tracking-widest uppercase'>

            <div className='flex items-center justify-center md:justify-start gap-3 border border-[#ffffff15] border-r-0 px-3 py-2 cursor-pointer hover:bg-[#ffffff10] hover:text-[#e09e86] transition-colors rounded-l-md' onClick={()=>navigate('/add')}>
                <IoIosAddCircleOutline className='w-[20px] h-[20px]'/>
                <p className='hidden md:block'>Add Items</p>

            </div>
               <div className='flex items-center justify-center md:justify-start gap-3 border border-[#ffffff15] border-r-0 px-3 py-2 cursor-pointer hover:bg-[#ffffff10] hover:text-[#e09e86] transition-colors rounded-l-md' onClick={()=>navigate('/lists')}>
                <FaRegListAlt className='w-[20px] h-[20px]'/>
                <p className='hidden md:block'>List Items</p>

            </div>
               <div className='flex items-center justify-center md:justify-start gap-3 border border-[#ffffff15] border-r-0 px-3 py-2 cursor-pointer hover:bg-[#ffffff10] hover:text-[#e09e86] transition-colors rounded-l-md' onClick={()=>navigate('/orders')}>
                <SiTicktick className='w-[20px] h-[20px]'/>
                <p className='hidden md:block'>View Orders</p>

            </div>
            <div className='flex items-center justify-center md:justify-start gap-3 border border-[#ffffff15] border-r-0 px-3 py-2 cursor-pointer hover:bg-[#ffffff10] hover:text-[#e09e86] transition-colors rounded-l-md' onClick={()=>navigate('/analytics')}>
                <IoMdAnalytics className='w-[20px] h-[20px]'/>
                <p className='hidden md:block'>Analytics</p>
            </div>
            <div className='flex items-center justify-center md:justify-start gap-3 border border-[#ffffff15] border-r-0 px-3 py-2 cursor-pointer hover:bg-[#ffffff10] hover:text-[#e09e86] transition-colors rounded-l-md' onClick={()=>navigate('/jobs')}>
                <FaUserTie className='w-[20px] h-[20px]'/>
                <p className='hidden md:block'>Applications</p>
            </div>
        </div>
      
    </div>
  )
}

export default Sidebar
