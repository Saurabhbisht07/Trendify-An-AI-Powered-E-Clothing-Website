import React from 'react'
import LatestCollection from '../component/LatestCollection'
import BestSeller from '../component/BestSeller'

function Product() {
  return (
    <div className='w-full bg-[#151113] flex flex-col pt-16 pb-24 gap-32 relative'>
        <LatestCollection/>
        <BestSeller/>
    </div>
  )
}

export default Product
