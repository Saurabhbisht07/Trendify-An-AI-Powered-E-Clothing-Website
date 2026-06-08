import React from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { useState } from 'react'
import { useContext } from 'react'
import { authDataContext } from '../context/AuthContext'
import { useEffect } from 'react'
import axios from 'axios'

function Home() {
    const [totalProducts, setTotalProducts] = useState(0)
  const [totalOrders, setTotalOrders] = useState(0)
  
  const { serverUrl } = useContext(authDataContext)

 const fetchCounts = async () => {
    try {
      const products = await axios.get(`${serverUrl}/api/product/list`, {} ,{withCredentials:true})
      setTotalProducts(products.data.length)

      const orders = await axios.post(`${serverUrl}/api/order/list`, {} ,{withCredentials:true})
      setTotalOrders(orders.data.length)
    } catch (err) {
      console.error("Failed to fetch counts", err)
    }
  }

   useEffect(() => {
    fetchCounts()
  }, [])
  return (
   
    <div className='w-[100vw] h-[100vh] bg-[#151113] text-[white] relative'>
       <Nav/>
       <Sidebar/>

       <div className='w-[70vw] h-[100vh] absolute left-[25%] flex items-Start justify-start flex-col  gap-[40px] py-[100px]'>
         <h1 className='text-[40px] md:text-[55px] font-serif tracking-widest uppercase mb-10 text-white'><span className='text-[#e09e86] italic font-light pr-4'>Trendify</span>Admin Panel</h1>
         <div className='flex items-center justify-start gap-[50px] flex-col md:flex-row'>
          <div  className='text-white w-[400px] max-w-[90%] h-[200px] bg-[#1a1517e6] backdrop-blur-xl flex items-center justify-center flex-col gap-[20px] rounded-2xl shadow-2xl md:text-[28px] text-[20px] border border-[#ffffff15] hover:border-[#e09e86] transition-colors'>Total No. of Products : <span className='px-[25px] py-[15px] text-[24px] bg-[#e09e86] text-black rounded-lg flex items-center justify-center font-bold tracking-widest'>{totalProducts}</span></div>
          <div  className='text-white w-[400px] max-w-[90%] h-[200px] bg-[#1a1517e6] backdrop-blur-xl flex items-center justify-center flex-col gap-[20px] rounded-2xl shadow-2xl md:text-[28px] text-[20px] border border-[#ffffff15] hover:border-[#e09e86] transition-colors'>Total No. of Orders : <span className='px-[25px] py-[15px] text-[24px] bg-[#e09e86] text-black rounded-lg flex items-center justify-center font-bold tracking-widest'>{totalOrders}</span></div>

         </div>
       </div>

      
    </div>
  )
}

export default Home
