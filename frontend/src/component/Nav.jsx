import React, { useContext, useState, useEffect } from 'react'
import logo from '../assets/logo.png'
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineShoppingCart, MdOutlineFavoriteBorder, MdContacts } from "react-icons/md";
import { userDataContext } from '../context/UserContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoMdHome } from "react-icons/io";
import { HiOutlineCollection } from "react-icons/hi";
import axios from 'axios';
import { authDataContext } from '../context/AuthContext';
import { shopDataContext } from '../context/ShopContext';

function Nav() {
    let {getCurrentUser , userData} = useContext(userDataContext)
    let {serverUrl} = useContext(authDataContext)
    let {showSearch,setShowSearch,search,setSearch,getCartCount} = useContext(shopDataContext)
    let [showProfile,setShowProfile] = useState(false)
    let [scrolled, setScrolled] = useState(false)
    let navigate = useNavigate()
    let location = useLocation()

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleLogout = async () => {
        try {
            await axios.get(serverUrl + "/api/auth/logout" , {withCredentials:true})
            navigate("/login")
            getCurrentUser()
        } catch (error) {
            console.log(error)
        }
    }
    
    const navLinks = [
        { name: 'HOME', path: '/' },
        { name: 'COLLECTIONS', path: '/collection' },
        { name: 'ABOUT', path: '/about' },
        { name: 'CONTACT', path: '/contact' }
    ]

  return (
    <>
    <div className={`w-full h-[80px] fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 transition-all duration-300 ${scrolled ? 'bg-[#151113e6] backdrop-blur-lg border-b border-[#ffffff10] shadow-2xl' : 'bg-[#151113] border-b border-[#ffffff10]'}`}>

        {/* Logo */}
        <div className='flex items-center gap-3 cursor-pointer' onClick={() => navigate("/")}>
            <img src={logo} alt="Trendify" className='w-[35px] drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]' />
            <h1 className='text-[24px] text-white font-serif tracking-wider'>Trendify</h1>
        </div>

        {/* Desktop Links */}
        <div className='hidden lg:flex items-center gap-10'>
            {navLinks.map(link => (
                <div key={link.name} onClick={()=>navigate(link.path)} className={`text-[12px] font-bold tracking-[0.2em] cursor-pointer transition-colors ${location.pathname === link.path ? 'text-[#e09e86]' : 'text-[#a0a0a0] hover:text-white'}`}>
                    {link.name}
                </div>
            ))}
        </div>

        {/* Right Actions */}
        <div className='flex items-center gap-5 md:gap-8'>
            {/* Search */}
            <div className='w-10 h-10 rounded-full border border-[#ffffff20] flex items-center justify-center cursor-pointer hover:bg-[#ffffff10] transition-colors' onClick={() => {setShowSearch(prev => !prev); if(!showSearch) navigate("/collection")}}>
                <IoSearchOutline className='text-[18px] text-white' />
            </div>

            {/* Wishlist (Dummy) */}
            <div className='w-10 h-10 rounded-full border border-[#ffffff20] hidden sm:flex items-center justify-center cursor-pointer hover:bg-[#ffffff10] transition-colors'>
                <MdOutlineFavoriteBorder className='text-[18px] text-white' />
            </div>

            {/* Cart */}
            <div className='w-10 h-10 rounded-full border border-[#ffffff20] hidden md:flex items-center justify-center cursor-pointer hover:bg-[#ffffff10] transition-colors relative' onClick={()=>navigate("/cart")}>
                <MdOutlineShoppingCart className='text-[18px] text-white' />
                <span className='absolute -top-1 -right-1 w-[18px] h-[18px] bg-[#e09e86] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg'>
                    {getCartCount()}
                </span>
            </div>

            {/* My Account Button */}
            <div className='relative'>
                <button onClick={()=>setShowProfile(!showProfile)} className='bg-gradient-to-r from-[#d97d66] to-[#e4ac7a] hover:opacity-90 transition-opacity text-white px-5 h-10 rounded-lg text-[11px] font-bold tracking-[0.15em] uppercase shadow-lg flex items-center gap-2'>
                    {userData ? userData.name.split(' ')[0] : 'My Account'}
                </button>

                {/* Profile Dropdown */}
                {showProfile && (
                    <div className='absolute right-0 top-[120%] w-[200px] bg-[#1a1517] border border-[#ffffff15] rounded-xl shadow-2xl overflow-hidden backdrop-blur-xl'>
                        <ul className='flex flex-col py-2'>
                            {!userData ? (
                                <li className='px-5 py-3 text-[13px] text-[#a0a0a0] hover:text-white hover:bg-[#ffffff0a] cursor-pointer transition-colors' onClick={()=>{navigate("/login"); setShowProfile(false)}}>Sign In</li>
                            ) : (
                                <>
                                    <li className='px-5 py-3 text-[13px] text-white font-serif border-b border-[#ffffff10] cursor-default'>Hi, {userData.name}</li>
                                    <li className='px-5 py-3 text-[13px] text-[#a0a0a0] hover:text-white hover:bg-[#ffffff0a] cursor-pointer transition-colors' onClick={()=>{navigate("/order"); setShowProfile(false)}}>My Orders</li>
                                    <li className='px-5 py-3 text-[13px] text-[#e05656] hover:bg-[#ffffff0a] cursor-pointer transition-colors' onClick={()=>{handleLogout(); setShowProfile(false)}}>Log Out</li>
                                </>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </div>

    </div>

    {/* Search Bar Dropdown */}
    <div className={`fixed left-0 right-0 z-40 transition-all duration-300 ease-in-out ${showSearch ? 'top-[80px] opacity-100 visible' : 'top-[60px] opacity-0 invisible'} flex items-center justify-center pointer-events-none`}>
        <div className='w-full max-w-[600px] mx-auto p-4 pointer-events-auto'>
            <div className='bg-[#1a1517] border border-[#ffffff15] rounded-full px-6 flex items-center h-14 shadow-2xl backdrop-blur-xl'>
                <IoSearchOutline className='text-[20px] text-[#808080] mr-4' />
                <input type="text" className='flex-1 bg-transparent border-none outline-none text-white text-[15px] placeholder:text-[#ffffff40]' placeholder='Search for collections, trending items...' value={search} onChange={(e)=>setSearch(e.target.value)} />
                <span className='text-[10px] text-[#808080] ml-4 cursor-pointer hover:text-white uppercase tracking-wider' onClick={()=>setShowSearch(false)}>Close</span>
            </div>
        </div>
    </div>

    {/* Mobile Bottom Nav */}
    <div className='md:hidden fixed bottom-0 left-0 right-0 h-[70px] bg-[#1a1517e6] backdrop-blur-lg border-t border-[#ffffff10] z-50 flex items-center justify-around px-4 pb-safe'>
        <div className='flex flex-col items-center justify-center gap-1 cursor-pointer group' onClick={()=>navigate("/")}>
            <IoMdHome className={`text-[24px] ${location.pathname==='/' ? 'text-[#e09e86]' : 'text-[#808080] group-hover:text-white transition-colors'}`} />
            <span className={`text-[9px] uppercase tracking-wider ${location.pathname==='/' ? 'text-[#e09e86]' : 'text-[#808080]'}`}>Home</span>
        </div>
        <div className='flex flex-col items-center justify-center gap-1 cursor-pointer group' onClick={()=>navigate("/collection")}>
            <HiOutlineCollection className={`text-[24px] ${location.pathname==='/collection' ? 'text-[#e09e86]' : 'text-[#808080] group-hover:text-white transition-colors'}`} />
            <span className={`text-[9px] uppercase tracking-wider ${location.pathname==='/collection' ? 'text-[#e09e86]' : 'text-[#808080]'}`}>Shop</span>
        </div>
        <div className='flex flex-col items-center justify-center gap-1 cursor-pointer group relative' onClick={()=>navigate("/cart")}>
            <MdOutlineShoppingCart className={`text-[24px] ${location.pathname==='/cart' ? 'text-[#e09e86]' : 'text-[#808080] group-hover:text-white transition-colors'}`} />
            <span className='absolute -top-1 -right-2 bg-[#e09e86] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-lg'>{getCartCount()}</span>
            <span className={`text-[9px] uppercase tracking-wider ${location.pathname==='/cart' ? 'text-[#e09e86]' : 'text-[#808080]'}`}>Cart</span>
        </div>
        <div className='flex flex-col items-center justify-center gap-1 cursor-pointer group' onClick={()=>navigate("/contact")}>
            <MdContacts className={`text-[24px] ${location.pathname==='/contact' ? 'text-[#e09e86]' : 'text-[#808080] group-hover:text-white transition-colors'}`} />
            <span className={`text-[9px] uppercase tracking-wider ${location.pathname==='/contact' ? 'text-[#e09e86]' : 'text-[#808080]'}`}>Contact</span>
        </div>
    </div>
    </>
  )
}

export default Nav
