import React, { useContext } from 'react'
import { shopDataContext } from '../context/ShopContext'
import Title from './Title'

function CartTotal() {
    const {currency , delivery_fee , getCartAmount} = useContext(shopDataContext)
  return (
    <div className='w-full'>
        <div className='text-left mb-6'>
        <h3 className='text-[#e09e86] text-[12px] font-bold tracking-[0.2em] uppercase'>Order Summary</h3>
        <h2 className='text-[30px] font-serif text-white mt-1'>Cart Totals</h2>
      </div>
      
      <div className='flex flex-col gap-4 mt-2 p-8 rounded-2xl bg-[#ffffff05] border border-[#ffffff10]'>
       <div className='flex justify-between items-center text-[15px]'>
          <p className='text-[#a0a0a0]'>Subtotal</p>
          <p className='text-white font-medium'>{currency} {getCartAmount()}.00</p>
        </div>
        
        <div className='w-full h-[1px] bg-[#ffffff10] my-1'></div>
        
         <div className='flex justify-between items-center text-[15px]'>
          <p className='text-[#a0a0a0]'>Shipping Fee</p>
          <p className='text-white font-medium'>{currency} {delivery_fee}.00</p>
        </div>
        
        <div className='w-full h-[1px] bg-[#ffffff10] my-1'></div>
        
        <div className='flex justify-between items-center text-[18px]'>
          <b className='text-white font-serif'>Total</b>
          <b className='text-[#e09e86] font-serif'>{currency} {getCartAmount()=== 0 ? 0 :getCartAmount() + delivery_fee}.00</b>
        </div>
      </div>
      
    </div>
  )
}

export default CartTotal
