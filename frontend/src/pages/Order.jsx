import React, { useContext, useEffect, useState } from 'react'
import Title from '../component/Title'
import { shopDataContext } from '../context/ShopContext'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'

function Order() {
    let [orderData,setOrderData] = useState([])
    let {currency} = useContext(shopDataContext)
    let {serverUrl} = useContext(authDataContext)

    const loadOrderData = async () => {
       try {
            const result = await axios.post(serverUrl + '/api/order/userorder',{},{withCredentials:true})
            if(result.data){
                let allOrdersItem = []
                result.data.forEach((order)=>{
                    order.items.forEach((item)=>{
                        item['status'] = order.status
                        item['payment'] = order.payment
                        item['paymentMethod'] = order.paymentMethod
                        item['date'] = order.date
                        allOrdersItem.push(item)
                    })
                })
                setOrderData(allOrdersItem.reverse())
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        loadOrderData()
    },[])

  return (
    <div className='w-full min-h-screen bg-[#151113] pt-[120px] pb-24 font-sans'>
      
      <div className='mb-16'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div className='max-w-[1000px] mx-auto px-8 flex flex-col gap-6'>
        {
         orderData.map((item,index)=>(
            <div key={index} className='w-full p-6 bg-[#ffffff05] border border-[#ffffff10] rounded-2xl flex flex-col md:flex-row items-center md:items-start gap-6 relative group transition-colors hover:bg-[#ffffff0a]'>
                
                {/* Product Image */}
                <div className='w-24 h-24 shrink-0 bg-[#ffffff05] rounded-xl flex items-center justify-center p-2 border border-[#ffffff0a]'>
                    <img src={item.image1} alt={item.name} className='w-full h-full object-contain filter drop-shadow-lg'/>
                </div>

                {/* Details */}
                <div className='flex-1 flex flex-col gap-3 w-full text-center md:text-left'>
                    <h3 className='text-[18px] md:text-[22px] font-serif text-white'>{item.name}</h3>
                    
                    <div className='flex flex-wrap items-center justify-center md:justify-start gap-4 text-[14px] text-[#a0a0a0]'>
                        <p className='text-[#e09e86] font-bold font-serif'>{currency} {item.price}</p>
                        <span className='w-1 h-1 bg-[#ffffff40] rounded-full hidden md:block'></span>
                        <p>Qty: <span className='text-white'>{item.quantity}</span></p>
                        <span className='w-1 h-1 bg-[#ffffff40] rounded-full hidden md:block'></span>
                        <p>Size: <span className='text-white'>{item.size}</span></p>
                    </div>

                    <div className='text-[13px] text-[#808080] flex flex-col gap-1 mt-2'>
                        <p>Ordered: <span className='text-[#a0a0a0]'>{new Date(item.date).toDateString()}</span></p>
                        <p>Payment: <span className='text-[#a0a0a0] uppercase'>{item.paymentMethod}</span></p>
                    </div>
                </div>

                {/* Status & Actions */}
                <div className='flex flex-col items-center md:items-end justify-between w-full md:w-auto mt-4 md:mt-0 gap-4'>
                    <div className='flex items-center gap-2 bg-[#ffffff05] px-4 py-2 rounded-full border border-[#ffffff10]'>
                        <span className={`w-2 h-2 rounded-full ${item.status === 'Delivered' ? 'bg-green-500' : 'bg-[#e09e86] animate-pulse'}`}></span> 
                        <p className='text-[13px] text-white font-medium'>{item.status}</p>
                    </div>

                    <button 
                        className='px-6 py-3 rounded-lg border border-[#ffffff20] bg-transparent text-white text-[12px] font-bold tracking-[0.1em] uppercase hover:bg-white hover:text-black transition-all cursor-pointer' 
                        onClick={loadOrderData} 
                    >
                        Track Order
                    </button>
                </div>

            </div>
         ))
        }

        {orderData.length === 0 && (
            <div className='text-center py-20 text-[#808080] text-[16px]'>
                You haven't placed any orders yet.
            </div>
        )}
      </div>
    </div>
  )
}

export default Order
