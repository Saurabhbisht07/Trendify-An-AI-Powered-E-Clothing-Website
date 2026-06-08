import React from 'react'
import back1 from "../assets/back1.jpg"
import back2 from "../assets/back2.jpg"
import back3 from "../assets/back3.jpg"
import back4 from "../assets/back4.jpg"

function Backgound({heroCount}) {
    const images = [back2, back1, back3, back4];
    return (
        <div className='absolute inset-0 z-0'>
            <img src={images[heroCount]} alt="Fashion Background" className='w-full h-full object-cover opacity-40 select-none pointer-events-none transition-opacity duration-1000' />
            <div className='absolute inset-0 bg-gradient-to-r from-[#110e10] via-[#110e10ea] to-transparent'></div>
            <div className='absolute inset-0 bg-gradient-to-t from-[#151113] via-transparent to-[#151113e6]'></div>
        </div>
    )
}

export default Backgound
