import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { shopDataContext } from '../context/ShopContext'
import Card from './Card'

function LatestCollection() {
    let {products} = useContext(shopDataContext)
    let [latestProducts,setLatestProducts] = useState([])

    useEffect(()=>{
        let latest = [...products].reverse();
        setLatestProducts(latest.slice(0,8));
    },[products])

  return (
    <div className='w-full px-8 md:px-16'>
      <div className='text-center mb-16 relative z-10'>
        <div className='flex justify-center mb-4'><Title text1={"LATEST"} text2={"ARRIVALS"}/></div>
        <p className='text-[#808080] text-[15px] max-w-[600px] mx-auto leading-relaxed'>
          Step Into Style – Experience our newest luxury pieces dropping this season. Curated for the modern wardrobe.
        </p>
      </div>

      <div className='max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8'>
        {
            latestProducts.map((item,index)=>(
                <Card key={index} name={item.name} image={item.image1} id={item._id} price={item.price}/>
            ))
        }
      </div>
    </div>
  )
}

export default LatestCollection
