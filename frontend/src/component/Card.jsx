import React, { useContext } from 'react'
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'

function Card({name , image , id , price}) {
    let {currency} = useContext(shopDataContext)
    let navigate = useNavigate()
    


  return (
    <div className='w-full max-w-[300px] mx-auto aspect-[4/5] bg-[#ffffff05] border border-[#ffffff10] rounded-2xl flex flex-col relative overflow-hidden cursor-pointer group hover:bg-[#ffffff0a] hover:border-[#ffffff20] transition-colors shadow-lg' onClick={()=>navigate(`/productdetail/${id}`)}>
        


        {/* Image Box — fills full card */}
        <div className='absolute inset-0 bottom-[60px]'>
           <img src={image} alt={name} className='w-full h-full object-cover transform group-hover:scale-105 transition-all duration-500 ease-out'/>
           {/* Subtle glow on hover */}
           <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>

        {/* Details Floor */}
        <div className='absolute bottom-0 left-0 right-0 h-[60px] px-4 py-3 bg-gradient-to-t from-[#0e0c0e] via-[#151113cc] to-transparent z-10 flex flex-col justify-center'>
            <h3 className='text-white text-[13px] font-medium truncate mb-0.5'>{name}</h3>
            <p className='text-[#e09e86] text-[12px] font-bold font-serif'>{currency} {price}</p>
        </div>
    </div>
  )
}

export default Card
