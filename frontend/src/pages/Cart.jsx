import React, { useContext, useEffect, useState } from 'react'
import Title from '../component/Title'
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { RiDeleteBin6Line } from "react-icons/ri";
import CartTotal from '../component/CartTotal';

function Cart() {
    const { products, currency, cartItem ,updateQuantity } = useContext(shopDataContext)
  const [cartData, setCartData] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const tempData = [];
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        if (cartItem[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItem[items][item],
          });
        }
      }
    }
    setCartData(tempData); 
  }, [cartItem]);

  return (
    <div className='w-full min-h-screen bg-[#151113] pt-[120px] pb-24 font-sans'>
      
      <div className='mb-16'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div className='max-w-[1200px] mx-auto px-8 md:px-16 flex flex-col lg:flex-row gap-12'>
          
        {/* Cart Items List */}
        <div className='flex-1 flex flex-col gap-6'>
            {cartData.length === 0 ? (
                <div className='text-center py-20 text-[#808080] text-[16px]'>
                    Your cart is currently empty. 
                    <br/>
                    <span className='text-[#e09e86] cursor-pointer hover:underline mt-4 inline-block' onClick={()=>navigate("/collection")}>
                        Back to Collections →
                    </span>
                </div>
            ) : (
                cartData.map((item,index)=>{
                    const productData = products.find((product) => product._id === item._id);
                    if(!productData) return null;
                    
                    return (
                        <div key={index} className='w-full p-6 bg-[#ffffff05] border border-[#ffffff10] rounded-2xl flex flex-col sm:flex-row items-center gap-6 relative group transition-colors hover:bg-[#ffffff0a]'>
                            
                            {/* Product Image */}
                            <div className='w-24 h-24 sm:w-32 sm:h-32 shrink-0 bg-[#ffffff05] rounded-xl flex items-center justify-center p-2 border border-[#ffffff0a]'>
                                <img className='w-full h-full object-contain filter drop-shadow-lg' src={productData.image1} alt={productData.name} />
                            </div>
                            
                            {/* Details */}
                            <div className='flex-1 flex flex-col items-center sm:items-start text-center sm:text-left gap-2 w-full'>
                                <h3 className='text-[18px] md:text-[22px] font-serif text-white'>{productData.name}</h3>
                                <div className='flex items-center gap-4 mt-1'>
                                    <p className='text-[16px] text-[#e09e86] font-bold font-serif'>{currency} {productData.price}</p>
                                    <div className='h-8 px-4 flex items-center justify-center bg-[#ffffff10] border border-[#ffffff20] text-white text-[13px] rounded-lg tracking-wider'>
                                        Size: {item.size}
                                    </div>
                                </div>
                            </div>
                            
                            {/* Actions */}
                            <div className='flex sm:flex-col items-center justify-between w-full sm:w-auto gap-4 mt-4 sm:mt-0'>
                                <input 
                                    type="number" 
                                    min={1} 
                                    defaultValue={item.quantity} 
                                    className='w-16 h-10 text-center bg-[#1a1517] border border-[#ffffff20] text-white rounded-lg outline-none focus:border-[#e09e86] transition-colors'  
                                    onChange={(e)=> (e.target.value === '' || e.target.value === '0') ? null : updateQuantity(item._id,item.size,Number(e.target.value))} 
                                />
                                <button className='w-10 h-10 rounded-full bg-[#ff4d4d15] text-[#ff4d4d] flex items-center justify-center hover:bg-[#ff4d4d] hover:text-white transition-colors cursor-pointer border border-[#ff4d4d30] hover:border-transparent' onClick={()=>updateQuantity(item._id,item.size,0)}>
                                    <RiDeleteBin6Line size={18} />
                                </button>
                            </div>
                            
                        </div>
                    )
                })
            )}
        </div>

        {/* Checkout Sidebar */}
        <div className='w-full lg:w-[400px] shrink-0'>
            <div className='sticky top-[100px]'>
                <CartTotal/>
                
                <button 
                    disabled={cartData.length === 0}
                    className={`w-full mt-6 h-14 rounded-xl flex items-center justify-center text-[13px] font-bold tracking-[0.15em] uppercase transition-all shadow-xl ${cartData.length === 0 ? 'bg-[#ffffff10] text-[#808080] cursor-not-allowed' : 'bg-gradient-to-r from-[#d97d66] to-[#e4ac7a] text-white hover:opacity-90 hover:shadow-2xl hover:-translate-y-1'}`} 
                    onClick={()=>{
                        if (cartData.length > 0) navigate("/placeorder");
                    }}>
                    Proceed to Checkout
                </button>
            </div>
        </div>

      </div>
    </div>
  )
}

export default Cart
