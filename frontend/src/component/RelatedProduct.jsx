import React, { useContext, useEffect, useState } from 'react'
import { shopDataContext } from '../context/ShopContext'
import Title from './Title'
import Card from './Card'

function RelatedProduct({category,subCategory,currentProductId }) {

    let {products} = useContext(shopDataContext)
    let [related,setRelated] = useState([])

    useEffect(()=>{
     if(products.length > 0){
        let productsCopy = products.slice()
        productsCopy = productsCopy.filter((item) => category === item.category)
        productsCopy = productsCopy.filter((item) => subCategory === item.subCategory)
        productsCopy = productsCopy.filter((item) => currentProductId  !== item._id)
        setRelated(productsCopy.slice(0,4))
     }
    },[products,category,subCategory,currentProductId])

  return related.length > 0 ? (
    <div className='w-full py-24 bg-[#110e10] border-t border-[#ffffff0a]'>
        <div className='max-w-[1400px] mx-auto px-8 md:px-16'>
            <div className='mb-16 text-center'>
                <div className='flex justify-center mb-4'><Title text1={'RELATED'} text2={'PRODUCTS'}/></div>
                <p className='text-[#808080] text-[15px]'>Discover similar styles that perfectly complement your choice.</p>
            </div>
            
            <div className='grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8'>
                {
                    related.map((item,index)=>(
                        <Card key={index} id={item._id} name={item.name } price={item.price} image={item.image1} />
                    ))
                }
            </div>
        </div>
    </div>
  ) : null;
}

export default RelatedProduct
