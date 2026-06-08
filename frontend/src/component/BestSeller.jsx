import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { shopDataContext } from '../context/ShopContext'
import Card from './Card'

function BestSeller() {
    let {products} = useContext(shopDataContext)
    let [bestSeller,setBestSeller] = useState([])

    useEffect(()=>{
        let filterProduct = products.filter((item) => item.bestseller);
        setBestSeller([...filterProduct].reverse().slice(0,4));
    },[products])

  return (
    <div className='w-full px-8 md:px-16'>
        <div className='text-center mb-16 relative z-10'>
            <div className='flex justify-center mb-4'><Title text1={"BEST"} text2={"SELLERS"}/></div>
            <p className='text-[#808080] text-[15px] max-w-[600px] mx-auto leading-relaxed'>
                Tried, Tested, and Loved – Discover our all-time highest rated pieces that define the Trendify aesthetic.
            </p>
        </div>

        <div className='max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8'>
            {
             bestSeller.map((item,index)=>(
                <Card key={index} name={item.name} id={item._id} price={item.price} image={item.image1}/>
             ))
            }
        </div>
    </div>
  )
}

export default BestSeller
