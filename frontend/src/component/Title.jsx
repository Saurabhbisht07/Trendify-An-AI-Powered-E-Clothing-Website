import React from 'react'

function Title({text1 ,text2}) {
  return (
    <div className='inline-flex flex-col items-center justify-center text-center'>
        <h2 className='text-[35px] md:text-[50px] font-serif text-white leading-tight uppercase tracking-wider drop-shadow-lg mx-4'>
            <span className='font-light italic text-[#e09e86] mr-4'>{text1}</span>
            {text2}
        </h2>
    </div>
  )
}

export default Title
