import React from 'react'
import Logo from "../assets/logo.png"
import { useNavigate } from 'react-router-dom'
import google from '../assets/google.png'
import { IoEyeOutline } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { useState } from 'react';
import { useContext } from 'react';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios'
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase';
import { userDataContext } from '../context/UserContext';
import { toast } from 'react-toastify';
import Loading from '../component/Loading';

function Registration() {
  let [show, setShow] = useState(false)
  let { serverUrl } = useContext(authDataContext)
  let [name, setName] = useState("")
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let { userdata, getCurrentUser } = useContext(userDataContext)
  let [loading, setLoading] = useState(false)

  let navigate = useNavigate()

  const handleSignup = async (e) => {
    setLoading(true)
    e.preventDefault()
    try {
      const result = await axios.post(serverUrl + '/api/auth/registration', {
        name, email, password
      }, { withCredentials: true })
      await getCurrentUser()
      navigate("/")
      toast.success("User Registration Successful")
      console.log(result.data)
      setLoading(false)

    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || "User Registration Failed")
      setLoading(false)
    }
  }

  const googleSignup = async () => {
    try {
      const response = await signInWithPopup(auth, provider)
      let user = response.user
      let name = user.displayName;
      let email = user.email

      const result = await axios.post(serverUrl + "/api/auth/googlelogin", { name, email }, { withCredentials: true })
      console.log(result.data)
      await getCurrentUser()
      navigate("/")
      toast.success("User Registration Successful")

    } catch (error) {
      console.log(error)
      toast.error("User Registration Failed")
    }

  }

  return (
    <div className='w-[100vw] h-[100vh] bg-[#1a1216] flex flex-row-reverse font-sans overflow-hidden'>

      {/* Right Panel - Brand (Hidden on Mobile) */}
      <div className='hidden md:flex flex-col w-1/2 h-full bg-gradient-to-bl from-[#1a1216] via-[#2a1b1d] to-[#1a1216] relative p-12 justify-between border-l border-[#ffffff15]'>

        {/* Abstract background rings */}
        <div className="absolute top-[-10%] right-[-20%] w-[600px] h-[600px] border-[1px] border-[#ffffff08] rounded-full"></div>
        <div className="absolute bottom-[20%] right-[30%] w-[800px] h-[800px] border-[1px] border-[#ffffff08] rounded-full"></div>

        {/* Logo & Brand */}
        <div className='flex items-center justify-end gap-3 relative z-10 cursor-pointer' onClick={() => navigate("/")}>
          <h1 className='text-[28px] text-white font-serif tracking-wide'>Trendify</h1>
          <img src={Logo} alt="Trendify" className='w-[40px] drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]' />
        </div>

        {/* Hero Text */}
        <div className='relative z-10 mt-10 text-right'>
          <h3 className='text-[#e09e86] text-[12px] font-bold tracking-[0.2em] mb-4 uppercase flex items-center justify-end gap-4'>
            <span className='w-8 h-[1px] bg-[#e09e86]'></span>
            Join the Club
            <span className='w-8 h-[1px] bg-[#e09e86]'></span>
          </h3>
          <h2 className='text-[65px] leading-[1.1] font-serif text-white mb-6'>
            Define your<br />
            <span className='italic text-[#e09e86] font-light'>aesthetic.</span>
          </h2>
          <p className='text-[#a0a0a0] text-[16px] leading-[1.8] max-w-[400px] ml-auto mb-4'>
            Create an account to unlock exclusive collections, early access to drops, and personalized recommendations.
          </p>
        </div>

        {/* Floating Product Cards (Mirrored alignment) */}
        <div className="absolute left-[10%] top-[30%] flex flex-col gap-6 z-10">
          {/* Card 1 */}
          <div className='bg-[#ffffff08] border border-[#ffffff15] backdrop-blur-md p-4 rounded-2xl flex flex-col items-center justify-center w-[130px] shadow-2xl -translate-x-8 transform hover:scale-105 transition-transform cursor-pointer'>
            <div className='w-16 h-16 bg-gradient-to-tr from-purple-400 to-pink-500 rounded-lg mb-3 shadow-[0_0_15px_rgba(236,72,153,0.3)] flex items-center justify-center text-2xl'>👜</div>
            <p className='text-white text-[12px] font-semibold text-center'>Leather Tote</p>
            <p className='text-[#e09e86] text-[11px] font-bold'>₹ 3,200</p>
          </div>
          {/* Card 2 */}
          <div className='bg-[#ffffff08] border border-[#ffffff15] backdrop-blur-md p-4 rounded-2xl flex flex-col items-center justify-center w-[130px] shadow-2xl translate-x-12 transform hover:scale-105 transition-transform cursor-pointer'>
            <div className='w-16 h-16 bg-gradient-to-tr from-emerald-300 to-teal-500 rounded-lg mb-3 shadow-[0_0_15px_rgba(20,184,166,0.3)] flex items-center justify-center text-2xl'>👟</div>
            <p className='text-white text-[12px] font-semibold text-center'>Classic Sneakers</p>
            <p className='text-[#e09e86] text-[11px] font-bold'>₹ 2,500</p>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className='flex gap-12 relative z-10 justify-end'>
          <div className='text-right'>
            <h4 className='text-[#e09e86] text-[28px] font-serif font-bold'>Fast</h4>
            <p className='text-[#a0a0a0] text-[12px] uppercase tracking-wider mt-1'>Shipping</p>
          </div>
          <div className='text-right'>
            <h4 className='text-[#e09e86] text-[28px] font-serif font-bold'>Easy</h4>
            <p className='text-[#a0a0a0] text-[12px] uppercase tracking-wider mt-1'>Returns</p>
          </div>
        </div>

      </div>

      {/* Left Panel - Registration Form */}
      <div className='w-full md:w-1/2 h-full flex items-center justify-center bg-[#151113] p-8 md:p-20 relative overflow-y-auto'>
        {/* Mobile Logo */}
        <div className='md:hidden absolute top-8 left-8 flex items-center gap-2 cursor-pointer' onClick={() => navigate("/")}>
          <img src={Logo} alt="Trendify" className='w-[30px]' />
          <h1 className='text-[20px] text-white font-serif'>Trendify</h1>
        </div>

        <div className='w-full max-w-[450px]'>
          <h4 className='text-[#e09e86] text-[12px] font-bold tracking-[0.2em] mb-4 uppercase'>New Member</h4>
          <h2 className='text-[50px] leading-[1.1] font-serif text-white mb-6'>
            Create <span className='italic text-[#e09e86] font-light'>an</span><br />
            account
          </h2>
          <p className='text-[#a0a0a0] text-[15px] mb-10'>
            Sign up to shop the latest trends<br />
            and manage your orders easily.
          </p>

          <button
            type="button"
            onClick={googleSignup}
            className='w-full h-[55px] bg-[#ffffff05] border border-[#ffffff15] hover:bg-[#ffffff10] rounded-lg flex items-center justify-center gap-3 transition-colors text-white text-[15px] font-medium mb-8'>
            <img src={google} alt="" className='w-[20px]' /> Registration with Google
          </button>

          <div className='flex items-center gap-4 mb-8'>
            <div className='flex-1 h-[1px] bg-[#ffffff15]'></div>
            <span className='text-[#808080] text-[12px] font-semibold tracking-wider'>OR</span>
            <div className='flex-1 h-[1px] bg-[#ffffff15]'></div>
          </div>

          <form onSubmit={handleSignup} className='flex flex-col gap-6'>
            <div className='flex flex-col'>
              <label className='text-[#808080] text-[11px] font-bold tracking-wider mb-2 uppercase'>Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className='w-full bg-[#1a1517] border border-[#ffffff15] focus:border-[#e09e86] rounded-lg px-4 py-4 text-white placeholder-[#ffffff40] outline-none transition-colors text-[15px]'
              />
            </div>

            <div className='flex flex-col'>
              <label className='text-[#808080] text-[11px] font-bold tracking-wider mb-2 uppercase'>Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className='w-full bg-[#1a1517] border border-[#ffffff15] focus:border-[#e09e86] rounded-lg px-4 py-4 text-white placeholder-[#ffffff40] outline-none transition-colors text-[15px]'
              />
            </div>

            <div className='flex flex-col relative'>
              <label className='text-[#808080] text-[11px] font-bold tracking-wider mb-2 uppercase'>Password</label>
              <input
                type={show ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className='w-full bg-[#1a1517] border border-[#ffffff15] focus:border-[#e09e86] rounded-lg px-4 py-4 text-white placeholder-[#ffffff40] outline-none transition-colors text-[15px]'
              />
              <div className='absolute right-4 top-[40px] text-[#ffffff60] hover:text-white cursor-pointer transition-colors' onClick={() => setShow(!show)}>
                {show ? <IoEye size={20} /> : <IoEyeOutline size={20} />}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className='w-full h-[60px] bg-gradient-to-r from-[#d97d66] to-[#e4ac7a] hover:opacity-90 rounded-lg flex items-center justify-center text-white text-[14px] font-bold tracking-[0.15em] uppercase mt-4 transition-opacity'>
              {loading ? <Loading /> : "Create Account"}
            </button>
          </form>

          <p className='text-center text-[#808080] text-[14px] mt-10'>
            Already have an account? <span className='text-white cursor-pointer hover:underline' onClick={() => navigate("/login")}>Sign in →</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Registration
