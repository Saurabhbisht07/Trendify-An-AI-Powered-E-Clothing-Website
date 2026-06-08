import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { shopDataContext } from '../context/ShopContext'
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import RelatedProduct from '../component/RelatedProduct';
import Loading from '../component/Loading';

function ProductDetail() {
    let {productId} = useParams()
    let {products,currency ,addtoCart ,loading} = useContext(shopDataContext)
    let [productData,setProductData] = useState(false)

    const [image, setImage] = useState('')
    const [image1, setImage1] = useState('')
    const [image2, setImage2] = useState('')
    const [image3, setImage3] = useState('')
    const [image4, setImage4] = useState('')
    const [size, setSize] = useState('')
    const [activeTab, setActiveTab] = useState('description')
    const [showSizeGuide, setShowSizeGuide] = useState(false)
    const [showSmartSize, setShowSmartSize] = useState(false)
    const [userHeight, setUserHeight] = useState(170)
    const [userWeight, setUserWeight] = useState(70)
    const [showStickyBar, setShowStickyBar] = useState(false)

   const fetchProductData = async () => {
    products.forEach((item) => {
      if (item._id === productId) {
        setProductData(item)
        setImage1(item.image1)
        setImage2(item.image2)
        setImage3(item.image3)
        setImage4(item.image4)
        setImage(item.image1)
      }
    })
  }

  useEffect(() => {
    fetchProductData()
  }, [productId, products])

  useEffect(() => {
    const handleScroll = () => {
        if(window.scrollY > 500) {
            setShowStickyBar(true)
        } else {
            setShowStickyBar(false)
        }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return productData ? (
    <div className='w-full min-h-screen bg-[#151113] pt-[120px] font-sans pb-24'>
        
        {/* Sticky Buy It Now Bar */}
        <div className={`fixed top-0 left-0 w-full bg-[#151113]/95 backdrop-blur-xl border-b border-[#ffffff10] z-[100] transform transition-transform duration-500 flex items-center justify-between px-4 md:px-16 py-3 ${showStickyBar ? 'translate-y-0' : '-translate-y-full'}`}>
            <div className='flex items-center gap-4'>
                <img src={image} className='w-10 h-12 object-cover rounded-md'/>
                <div className='hidden md:block'>
                    <h4 className='text-white text-[14px] font-bold'>{productData.name}</h4>
                    <p className='text-[#e09e86] font-serif text-[13px]'>{currency} {productData.price}</p>
                </div>
            </div>
            <div className='flex items-center gap-3 md:gap-6'>
                <select value={size} onChange={(e) => setSize(e.target.value)} className='bg-[#ffffff05] border border-[#ffffff20] text-white text-[13px] rounded-lg px-2 md:px-4 py-2 outline-none font-bold'>
                    <option value="" disabled>Size</option>
                    {productData.sizes.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <button onClick={()=>addtoCart(productData._id , size)} className='bg-gradient-to-r from-[#d97d66] to-[#e4ac7a] hover:opacity-90 px-6 py-2.5 rounded-xl text-white font-bold tracking-[0.1em] text-[12px] shadow-xl transition-all hover:scale-105 whitespace-nowrap'>
                    BUY NOW
                </button>
            </div>
        </div>

        {/* Smart Size Modal */}
        {showSmartSize && (
            <div className='fixed inset-0 z-[70] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn'>
                <div className='bg-[#151113] border border-[#ffffff20] rounded-3xl w-full max-w-sm p-8 relative shadow-2xl'>
                    <button onClick={() => setShowSmartSize(false)} className='absolute top-5 right-5 text-[#808080] hover:text-[#e09e86] transition-all'><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
                    <h3 className='text-white font-serif text-[24px] mb-2 flex items-center gap-2'><svg className="w-6 h-6 text-[#e09e86]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg> Perfect Fit AI</h3>
                    <p className='text-[#808080] text-[13px] mb-8'>Enter your details below and our algorithm will recommend your ideal size.</p>
                    
                    <div className='mb-6'>
                        <div className='flex justify-between text-white text-[13px] mb-2 font-bold'><span>Height</span> <span className='text-[#e09e86]'>{userHeight} cm</span></div>
                        <input type="range" min="140" max="210" value={userHeight} onChange={(e)=>setUserHeight(e.target.value)} className='w-full accent-[#e09e86] h-1.5 bg-[#ffffff20] rounded-lg appearance-none cursor-pointer'/>
                    </div>
                    
                    <div className='mb-8'>
                        <div className='flex justify-between text-white text-[13px] mb-2 font-bold'><span>Weight</span> <span className='text-[#e09e86]'>{userWeight} kg</span></div>
                        <input type="range" min="40" max="130" value={userWeight} onChange={(e)=>setUserWeight(e.target.value)} className='w-full accent-[#e09e86] h-1.5 bg-[#ffffff20] rounded-lg appearance-none cursor-pointer'/>
                    </div>
                    
                    <div className='bg-[#ffffff05] border border-[#ffffff10] rounded-xl p-4 text-center'>
                        <p className='text-[#a0a0a0] text-[12px] uppercase tracking-wider mb-2'>Recommended Size</p>
                        <p className='text-transparent bg-clip-text bg-gradient-to-r from-[#d97d66] to-[#e4ac7a] text-[38px] font-serif font-bold'>{ userHeight > 185 || userWeight > 85 ? 'XL' : userHeight > 175 || userWeight > 75 ? 'L' : userHeight < 165 && userWeight < 60 ? 'S' : 'M' }</p>
                        <p className='text-[#808080] text-[11px] mt-2'>94% Confidence Match based on Data</p>
                    </div>
                    
                    <button onClick={() => {
                        const rec = userHeight > 185 || userWeight > 85 ? 'XL' : userHeight > 175 || userWeight > 75 ? 'L' : userHeight < 165 && userWeight < 60 ? 'S' : 'M';
                        setSize(rec);
                        setShowSmartSize(false);
                    }} className='w-full mt-6 bg-white text-black py-4 rounded-xl font-bold tracking-[0.1em] uppercase text-[13px] hover:bg-[#e09e86] hover:text-white transition-all duration-300'>
                        Apply Size
                    </button>
                </div>
            </div>
        )}

        {/* Size Guide Modal */}
        {showSizeGuide && (
            <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn'>
                <div className='bg-[#151113] border border-[#ffffff20] rounded-3xl w-full max-w-md p-8 relative shadow-2xl transform transition-all'>
                    <button 
                        onClick={() => setShowSizeGuide(false)}
                        className='absolute top-5 right-5 text-[#808080] hover:text-[#e09e86] hover:rotate-90 transition-all duration-300'
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                    <h3 className='text-white font-serif text-[24px] mb-6 border-b border-[#ffffff10] pb-4'>Size Guide</h3>
                    <table className='w-full text-left text-[#a0a0a0] text-[14px] mx-auto'>
                        <thead>
                            <tr className='text-white border-b border-[#ffffff10]'>
                                <th className='pb-3 font-medium'>Size</th>
                                <th className='pb-3 font-medium'>Chest (in)</th>
                                <th className='pb-3 font-medium'>Waist (in)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='border-b border-[#ffffff05] hover:bg-[#ffffff05] transition-colors'>
                                <td className='py-3 font-bold text-white pl-2'>S</td>
                                <td className='py-3'>36 - 38</td>
                                <td className='py-3'>28 - 30</td>
                            </tr>
                            <tr className='border-b border-[#ffffff05] hover:bg-[#ffffff05] transition-colors'>
                                <td className='py-3 font-bold text-white pl-2'>M</td>
                                <td className='py-3'>38 - 40</td>
                                <td className='py-3'>30 - 32</td>
                            </tr>
                            <tr className='border-b border-[#ffffff05] hover:bg-[#ffffff05] transition-colors'>
                                <td className='py-3 font-bold text-white pl-2'>L</td>
                                <td className='py-3'>40 - 42</td>
                                <td className='py-3'>32 - 34</td>
                            </tr>
                            <tr className='border-b border-[#ffffff05] hover:bg-[#ffffff05] transition-colors'>
                                <td className='py-3 font-bold text-white pl-2'>XL</td>
                                <td className='py-3'>42 - 44</td>
                                <td className='py-3'>34 - 36</td>
                            </tr>
                            <tr className='hover:bg-[#ffffff05] transition-colors'>
                                <td className='py-3 font-bold text-white pl-2'>XXL</td>
                                <td className='py-3'>44 - 46</td>
                                <td className='py-3'>36 - 38</td>
                            </tr>
                        </tbody>
                    </table>
                    <p className='mt-6 text-[12px] text-[#e09e86] flex items-center gap-2'>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        Measurements may vary slightly by style.
                    </p>
                </div>
            </div>
        )}

        {/* Main Product Showcase */}
        <div className='max-w-[1400px] mx-auto px-8 md:px-16 flex flex-col lg:flex-row gap-16 xl:gap-24 mb-32'>
            
            {/* Left: Image Gallery */}
            <div className='w-full lg:w-1/2 flex flex-col md:flex-row-reverse gap-6 h-auto'>
                
                {/* Main Hero Image */}
                <div className='w-full md:w-3/4 aspect-[4/5] bg-[#ffffff03] rounded-3xl border border-[#ffffff10] flex items-center justify-center p-8 relative group'>
                    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#e09e86] opacity-5 blur-[100px] rounded-full pointer-events-none'></div>
                    <img src={image} alt={productData.name} className='w-full h-full object-contain filter drop-shadow-2xl transition-transform duration-500 hover:scale-105 relative z-10' />
                </div>
                
                {/* Thumbnails */}
                <div className='w-full md:w-1/4 flex md:flex-col gap-4 justify-between md:justify-start'>
                    {[image1, image2, image3, image4].filter(Boolean).map((img, idx) => (
                        <div key={idx} onClick={()=>setImage(img)} className={`w-[22%] md:w-full aspect-[4/5] rounded-xl flex items-center justify-center p-2 cursor-pointer border transition-all duration-300 ${image === img ? 'border-[#e09e86] bg-[#ffffff0a] shadow-[0_0_15px_rgba(224,158,134,0.15)]' : 'border-[#ffffff10] bg-[#ffffff03] hover:border-[#ffffff30]'}`}>
                            <img src={img} alt="" className='w-full h-full object-contain opacity-80 hover:opacity-100 transition-opacity' />
                        </div>
                    ))}
                </div>
            </div>

            {/* Right: Product Details */}
            <div className='w-full lg:w-1/2 flex flex-col justify-center'>
                <h3 className='text-[#e09e86] text-[12px] font-bold tracking-[0.2em] mb-4 uppercase'>{productData.category} &rsaquo; {productData.subCategory}</h3>
                <h1 className='text-[35px] md:text-[45px] font-serif text-white leading-tight mb-4'>{productData.name}</h1>
                
                {/* Rating */}
                <div className='flex items-center gap-2 mb-8'>
                    <div className='flex items-center text-[#e09e86] text-[16px]'>
                        <FaStar/><FaStar/><FaStar/><FaStar/><FaStarHalfAlt/>
                    </div>
                    <span className='text-[#808080] text-[14px] ml-2'>(124 Verified Reviews)</span>
                </div>

                <div className='w-full h-[1px] bg-[#ffffff10] mb-8'></div>

                <p className='text-[36px] font-serif font-medium text-white mb-8'>{currency} {productData.price}</p>
                <p className='text-[#a0a0a0] text-[15px] leading-relaxed mb-10'>
                    {productData.description || "Stylish, breathable premium fabric with a modern slim fit. Easy to wash, super comfortable, and designed for effortless style."}
                </p>

                {/* Size Selection */}
                <div className='mb-10'>
                    <div className='flex justify-between items-center mb-4'>
                        <p className='text-white text-[14px] font-bold uppercase tracking-wider'>Select Size</p>
                        <div className='flex gap-5 items-center'>
                           <span onClick={() => setShowSmartSize(true)} className='text-[#e09e86] text-[12px] font-bold cursor-pointer hover:text-white transition-colors flex items-center gap-1 bg-[#e09e861a] px-3 py-1.5 rounded-full'><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg> Find My Size</span>
                           <span onClick={() => setShowSizeGuide(true)} className='text-[#808080] text-[12px] underline cursor-pointer hover:text-white transition-colors'>Size Chart</span>
                        </div>
                    </div>
                    
                    <div className='flex flex-wrap gap-4'>
                        {productData.sizes.map((item, index) => (
                            <button 
                                key={index} 
                                onClick={() => setSize(item)}
                                className={`w-14 h-14 rounded-lg flex items-center justify-center text-[15px] font-semibold transition-all duration-300 border ${item === size ? 'bg-[#e09e86] border-[#e09e86] text-white shadow-[0_0_15px_rgba(224,158,134,0.4)] transform -translate-y-1' : 'bg-[#ffffff05] border-[#ffffff20] text-[#a0a0a0] hover:bg-[#ffffff10] hover:border-[#ffffff40] hover:text-white'}`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Actions */}
                <div className='flex gap-4 mb-12'>
                    <button 
                        onClick={()=>addtoCart(productData._id , size)}
                        className='flex-1 h-[60px] bg-gradient-to-r from-[#d97d66] to-[#e4ac7a] hover:opacity-90 rounded-xl text-white font-bold tracking-[0.15em] uppercase text-[14px] shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 flex items-center justify-center'
                    >
                        {loading ? <Loading/> : "Add to Shopping Bag"}
                    </button>
                    <div className='w-[60px] h-[60px] rounded-xl border border-[#ffffff20] bg-[#ffffff05] flex items-center justify-center cursor-pointer hover:bg-[#ffffff10] transition-colors'>
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                    </div>
                </div>

                {/* Assurance Bullet points */}
                <div className='flex flex-col gap-3 pt-6 border-t border-[#ffffff10] text-[#808080] text-[13px]'>
                    <div className='flex items-center gap-3'><svg className="w-5 h-5 text-[#e09e86]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinelinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> 100% Original Premium Product</div>
                    <div className='flex items-center gap-3'><svg className="w-5 h-5 text-[#e09e86]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinelinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg> Secure Checkout & Cash on Delivery</div>
                    <div className='flex items-center gap-3'><svg className="w-5 h-5 text-[#e09e86]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinelinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg> Easy 7 Days Return Policy</div>
                </div>
            </div>
        </div>

        {/* Info Tabs */}
        <div className='max-w-[1400px] mx-auto px-8 md:px-16 mb-24'>
            <div className='flex gap-8 border-b border-[#ffffff10] mb-8'>
                <span onClick={()=>setActiveTab('description')} className={`pb-4 cursor-pointer text-[14px] font-bold tracking-[0.1em] uppercase transition-colors uppercase relative ${activeTab === 'description' ? 'text-white' : 'text-[#808080] hover:text-white'}`}>
                    Description
                    {activeTab === 'description' && <div className='absolute bottom-[-1px] left-0 w-full h-[2px] bg-[#e09e86]'></div>}
                </span>
                <span onClick={()=>setActiveTab('reviews')} className={`pb-4 cursor-pointer text-[14px] font-bold tracking-[0.1em] uppercase transition-colors uppercase relative ${activeTab === 'reviews' ? 'text-white' : 'text-[#808080] hover:text-white'}`}>
                    Reviews (124)
                    {activeTab === 'reviews' && <div className='absolute bottom-[-1px] left-0 w-full h-[2px] bg-[#e09e86]'></div>}
                </span>
            </div>
            
            <div className='bg-[#ffffff05] border border-[#ffffff10] rounded-2xl p-8 md:p-12 text-[#a0a0a0] leading-relaxed text-[15px]'>
                {activeTab === 'description' ? (
                    <p>Upgrade your wardrobe with this stylish product, available now on Trendify. Crafted from breathable, high-quality fabric, it offers all-day comfort and effortless style. Easy to maintain and perfect for any setting, this piece is a must-have essential for those who value both fashion and function. We pride ourselves on sourcing the best materials to ensure longevity and a luxurious feel.</p>
                ) : (
                    <p className='text-center py-10 italic'>No new reviews yet. Be the first to share your thoughts!</p>
                )}
            </div>
        </div>

        {/* Related Products */}
        <RelatedProduct category={productData.category} subCategory={productData.subCategory} currentProductId={productData._id}/>
      
    </div>
  ) : <div className='w-full min-h-screen bg-[#151113]'></div>
}

export default ProductDetail
