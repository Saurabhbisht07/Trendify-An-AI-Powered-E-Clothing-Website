import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from "../assets/logo.png"
import axios from 'axios'
import { authDataContext } from '../context/AuthContext'
import { adminDataContext } from '../context/AdminContext'
import { toast } from 'react-toastify'

function Nav() {
    let navigate = useNavigate()
    let {serverUrl} = useContext(authDataContext)
    let {getAdmin} = useContext(adminDataContext)

    const logOut = async () => {
        try {
            const result = await axios.get(serverUrl + "/api/auth/logout", {withCredentials:true})
            console.log(result.data)
            toast.success("LogOut Successfully")
            getAdmin()
            navigate("/login")

        } catch (error) {
            console.log(error)
            toast.error("LogOut Failed")
        }
        
    }
  return (
    <div className='w-[100vw] h-[70px] bg-[#151113e6] backdrop-blur-lg border-b border-[#ffffff10] z-10 fixed top-0 flex  items-center justify-between px-[30px] overflow-x-hidden shadow-md'>
        <div className='w-[30%]  flex items-center justify-start   gap-[10px] cursor-pointer ' onClick={()=>navigate("/")}>
        <img src={logo} alt="Trendify"  className='w-[35px] drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]'/>
        <h1 className='text-[28px] md:text-[35px] text-white font-serif tracking-widest'>Trendify</h1>

       


        </div>
         <button className='text-[13px] cursor-pointer bg-gradient-to-r from-[#d97d66] to-[#e4ac7a] py-[8px] px-[20px] rounded-lg text-white font-bold tracking-[0.1em] hover:opacity-90 transition-opacity shadow-lg uppercase' onClick={logOut}>LogOut</button>
      
    </div>
  )
}

export default Nav
