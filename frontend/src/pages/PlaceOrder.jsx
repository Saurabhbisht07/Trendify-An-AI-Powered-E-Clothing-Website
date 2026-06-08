import React, { useContext, useState } from 'react'
import Title from '../component/Title'
import CartTotal from '../component/CartTotal'
import razorpay from '../assets/Razorpay.jpg'
import { shopDataContext } from '../context/ShopContext'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loading from '../component/Loading'

function PlaceOrder() {
    let [method,setMethod] = useState('cod')
    let navigate = useNavigate()
    const {cartItem , setCartItem , getCartAmount , delivery_fee , products } = useContext(shopDataContext)
    let {serverUrl} = useContext(authDataContext)
    let [loading ,setLoading] = useState(false)

    let [formData,setFormData] = useState({
        firstName:'',
        lastName:'',
        email:'',
        street:'',
        city:'',
        state:'',
        pinCode:'',
        country:'',
        phone:''
    })

    const onChangeHandler = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setFormData(data => ({...data,[name]:value}))
    }

    const initPay = (order) =>{
        const options = {
            key:import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name:'Trendify Payment',
            description: 'Order Payment',
            order_id: order.id,
            receipt: order.receipt,
            theme: { color: "#e09e86" },
            handler: async (response) => {
                const {data} = await axios.post(serverUrl + '/api/order/verifyrazorpay',response,{withCredentials:true})
                if(data){
                    navigate("/order")
                    setCartItem({})
                }
            }
        }
        const rzp = new window.Razorpay(options)
        rzp.open()
    }
    
    const onSubmitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            let orderItems = []
            for(const items in cartItem){
                for(const item in cartItem[items]){
                    if(cartItem[items][item] > 0){
                        const itemInfo = structuredClone(products.find(product => product._id === items))
                        if(itemInfo){
                            itemInfo.size = item
                            itemInfo.quantity = cartItem[items][item]
                            orderItems.push(itemInfo)
                        }
                    }
                }
            }
            
            let orderData = {
                address:formData,
                items:orderItems,
                amount:getCartAmount() + delivery_fee
            }

            if(method === 'cod') {
                const result = await axios.post(serverUrl + "/api/order/placeorder" , orderData , {withCredentials:true})
                if(result.data){
                    setCartItem({})
                    toast.success("Order Placed Successfully")
                    navigate("/order")
                }else{
                    toast.error("Order Placement Failed")
                }
                setLoading(false)
            } else if (method === 'razorpay') {
                const resultRazorpay = await axios.post(serverUrl + "/api/order/razorpay" , orderData , {withCredentials:true})
                if(resultRazorpay.data){
                    initPay(resultRazorpay.data)
                    toast.success("Proceeding to Payment")
                }
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
            toast.error("An error occurred")
        }
    }

    const inputClasses = 'w-full h-[50px] rounded-lg bg-[#ffffff05] border border-[#ffffff15] text-white placeholder:text-[#ffffff40] px-4 text-[15px] outline-none focus:border-[#e09e86] focus:bg-[#ffffff0a] transition-all shadow-sm'

  return (
    <div className='w-full min-h-screen bg-[#151113] pt-[120px] pb-24 font-sans'>
        <div className='max-w-[1200px] mx-auto px-8 md:px-16 flex flex-col lg:flex-row gap-16 xl:gap-24'>
            
            {/* Left: Delivery Details Form */}
            <div className='w-full lg:w-1/2'>
                <form onSubmit={onSubmitHandler} id="checkout-form" className='flex flex-col gap-8'>
                    
                    <div className='mb-4'>
                        <Title text1={'DELIVERY'} text2={'INFORMATION'}/>
                    </div>

                    <div className='flex flex-col gap-5'>
                        <div className='flex gap-5'>
                            <input type="text" placeholder='First name' className={inputClasses} required onChange={onChangeHandler} name='firstName' value={formData.firstName}/>
                            <input type="text" placeholder='Last name' className={inputClasses} required onChange={onChangeHandler} name='lastName' value={formData.lastName} />
                        </div>
                        <input type="email" placeholder='Email address' className={inputClasses} required onChange={onChangeHandler} name='email' value={formData.email} />
                        <input type="text" placeholder='Street address' className={inputClasses} required onChange={onChangeHandler} name='street' value={formData.street} />
                        
                        <div className='flex gap-5'>
                            <input type="text" placeholder='City' className={inputClasses} required onChange={onChangeHandler} name='city' value={formData.city} />
                            <input type="text" placeholder='State' className={inputClasses} required onChange={onChangeHandler} name='state' value={formData.state} />
                        </div>
                        
                        <div className='flex gap-5'>
                            <input type="text" placeholder='Pincode' className={inputClasses} required onChange={onChangeHandler} name='pinCode' value={formData.pinCode} />
                            <input type="text" placeholder='Country' className={inputClasses} required onChange={onChangeHandler} name='country' value={formData.country} />
                        </div>
                        
                        <input type="tel" placeholder='Phone number' className={inputClasses} required onChange={onChangeHandler} name='phone' value={formData.phone} />
                    </div>
                </form>
            </div>

            {/* Right: Payment Method & Cart Total */}
            <div className='w-full lg:w-1/2 flex flex-col gap-10 mt-8 lg:mt-0'>
                
                <div className='bg-[#ffffff02] border border-[#ffffff0a] rounded-3xl p-8 sticky top-[100px] shadow-2xl'>
                    <CartTotal/>

                    <div className='mt-12 mb-6'>
                        <h3 className='text-[#e09e86] text-[12px] font-bold tracking-[0.2em] mb-4 uppercase'>Payment Details</h3>
                        <Title text1={'PAYMENT'} text2={'METHOD'}/>
                    </div>

                    <div className='flex flex-col sm:flex-row gap-4 mb-10'>
                        {/* Razorpay Toggle */}
                        <div onClick={()=>setMethod('razorpay')} className={`flex-1 h-16 rounded-xl border flex items-center justify-center cursor-pointer transition-all duration-300 relative overflow-hidden bg-white ${method === 'razorpay' ? 'border-[#e09e86] shadow-[0_0_15px_rgba(224,158,134,0.3)]' : 'border-[#ffffff10] opacity-70 hover:opacity-100 object-contain'}`}>
                            {method === 'razorpay' && <div className='absolute top-2 right-2 w-3 h-3 bg-[#e09e86] rounded-full'></div>}
                            <img src={razorpay} className='h-8 object-contain' alt="Razorpay" />
                        </div>

                        {/* COD Toggle */}
                        <div onClick={()=>setMethod('cod')} className={`flex-1 h-16 rounded-xl border flex items-center justify-center cursor-pointer transition-all duration-300 relative bg-[#1a1517] ${method === 'cod' ? 'border-[#e09e86] shadow-[0_0_15px_rgba(224,158,134,0.2)]' : 'border-[#ffffff20] hover:border-[#ffffff40]'}`}>
                            {method === 'cod' && <div className='absolute top-2 right-2 w-3 h-3 bg-[#e09e86] rounded-full'></div>}
                            <span className={`text-[13px] font-bold tracking-[0.1em] uppercase ${method === 'cod' ? 'text-white' : 'text-[#a0a0a0]'}`}>CASH ON DELIVERY</span>
                        </div>
                    </div>

                    <button 
                        type='submit' 
                        form="checkout-form"
                        disabled={loading}
                        className='w-full h-14 bg-gradient-to-r from-[#d97d66] to-[#e4ac7a] hover:opacity-90 rounded-xl text-white font-bold tracking-[0.15em] uppercase text-[13px] shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3'
                    >
                        {loading? <Loading/> : "Place Secure Order"}
                    </button>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default PlaceOrder
