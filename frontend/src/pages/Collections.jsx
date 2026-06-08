import React, { useContext, useEffect, useState } from 'react'
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import { shopDataContext } from '../context/ShopContext';
import Card from '../component/Card';

function Collections() {

    let [showFilter,setShowFilter] = useState(false)
    let {products,search,showSearch} = useContext(shopDataContext)
    let [filterProduct,setFilterProduct] = useState([])
    let [category,setCaterory] = useState([])
    let [subCategory,setSubCaterory] = useState([])
    let [sortType,SetSortType] = useState("relavent")
    let [maxPrice, setMaxPrice] = useState(10000);
    let [minRating, setMinRating] = useState(0);

    const toggleCategory = (e) =>{
        if(category.includes(e.target.value)){
            setCaterory(prev => prev.filter(item => item !== e.target.value))
        }else
         {
            setCaterory(prev => [...prev,e.target.value])
         }
    }

    const toggleSubCategory = (e) =>{
         if(subCategory.includes(e.target.value)){
            setSubCaterory(prev => prev.filter(item => item !== e.target.value))
        }else
         {
            setSubCaterory(prev => [...prev,e.target.value])
         }
    }

    const applyFilter = ()=>{
        let productCopy = products.slice()

        if(showSearch && search){
            const searchLower = search.toLowerCase();
            productCopy = productCopy.filter(item => 
                item.name.toLowerCase().includes(searchLower) || 
                item.category.toLowerCase().includes(searchLower) ||
                item.subCategory.toLowerCase().includes(searchLower)
            );
        }
        if(category.length > 0)
        {
            productCopy = productCopy.filter(item => category.includes(item.category))
        }
        if(subCategory.length > 0)
        {
            productCopy = productCopy.filter(item => subCategory.includes(item.subCategory))
        }

        productCopy = productCopy.filter(item => item.price <= maxPrice);

        if(minRating > 0) {
            productCopy = productCopy.filter(item => (item.rating || 4.5) >= minRating);
        }

        setFilterProduct(productCopy)

    }

    const sortProducts = ()=>{
        let fbCopy = filterProduct.slice()

        switch(sortType){
         case 'low-high':
            setFilterProduct(fbCopy.sort((a,b)=>(a.price - b.price)))
        break;

         case 'high-low':
            setFilterProduct(fbCopy.sort((a,b)=>(b.price - a.price)))
        break;
        default:
            applyFilter()
        break;
        }
    }

    useEffect(()=>{
        sortProducts()
    },[sortType])

    useEffect(()=>{
        applyFilter()
    },[category,subCategory,search,showSearch,products, maxPrice, minRating])

  return (
    <div className='w-full min-h-screen bg-[#151113] font-sans pb-20 pt-[80px]'>
      
      {/* Hero Header */}
      <div className='w-full relative py-16 px-8 md:px-16 overflow-hidden border-b border-[#ffffff15] bg-[#1a1216]'>
          <div className="absolute top-[-50%] left-[20%] w-[800px] h-[800px] border-[1px] border-[#ffffff08] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-[-30%] right-[-10%] w-[600px] h-[600px] border-[1px] border-[#ffffff05] rounded-full pointer-events-none"></div>
          
          <h3 className='text-[#e09e86] text-[12px] font-bold tracking-[0.2em] mb-4 uppercase flex items-center gap-4'>
            <span className='w-8 h-[1px] bg-[#e09e86]'></span>
            SPRING / SUMMER 2026
          </h3>
          <h1 className='text-[60px] md:text-[80px] leading-[1.1] font-serif text-white mb-2'>
            <span className='font-light italic text-[#e09e86]'>All</span> Collections
          </h1>
          <div className='absolute right-8 md:right-16 bottom-16 text-right'>
            <p className='text-[#30262b] text-[80px] md:text-[100px] font-serif font-light leading-[0.8] mb-2 select-none'>
                {filterProduct?.length || 0}
            </p>
            <span className='text-[11px] uppercase tracking-widest text-[#808080] font-bold'>pieces available</span>
          </div>
      </div>

      <div className='flex flex-col md:flex-row w-full px-8 md:px-16 mt-12'>
          
          {/* Sidebar */}
          <div className='w-full md:w-[250px] flex-shrink-0 md:pr-8 md:border-r border-[#ffffff15]'>
              {/* Mobile Filter Toggle */}
              <div className='md:hidden flex items-center justify-between mb-8 cursor-pointer' onClick={() => setShowFilter(!showFilter)}>
                  <h4 className='text-[#e09e86] text-[15px] font-bold tracking-[0.2em] uppercase'>Filters</h4>
                  {showFilter ? <FaChevronDown className='text-white' /> : <FaChevronRight className='text-white' />}
              </div>

              <div className={`${showFilter ? 'block' : 'hidden'} md:block transition-all`}>
                  
                  {/* Category Filter */}
                  <div className='mb-12'>
                      <h4 className='text-[#e09e86] text-[11px] font-bold tracking-[0.2em] mb-6 uppercase'>Categories</h4>
                      <div className='flex flex-col gap-4'>
                          {['Men', 'Women', 'Kids'].map(cat => (
                              <label key={cat} className='flex items-center gap-4 cursor-pointer group'>
                                  <div className={`w-[20px] h-[20px] rounded-[4px] border flex items-center justify-center transition-all duration-300 ${category.includes(cat) ? 'bg-[#e09e86] border-[#e09e86]' : 'border-[#ffffff40] group-hover:border-white bg-[#ffffff05]'}`}>
                                      {category.includes(cat) && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                  </div>
                                  <input type="checkbox" value={cat} className='hidden' onChange={toggleCategory} />
                                  <span className={`${category.includes(cat) ? 'text-white font-medium' : 'text-[#a0a0a0]'} text-[14px] transition-colors group-hover:text-white`}>{cat}</span>
                              </label>
                          ))}
                      </div>
                  </div>

                  {/* Sub-Category Filter */}
                  <div className='mb-12'>
                      <h4 className='text-[#e09e86] text-[11px] font-bold tracking-[0.2em] mb-6 uppercase'>Sub-Category</h4>
                      <div className='flex flex-col gap-4'>
                          {['TopWear', 'BottomWear', 'WinterWear'].map(subCat => (
                              <label key={subCat} className='flex items-center gap-4 cursor-pointer group'>
                                  <div className={`w-[20px] h-[20px] rounded-[4px] border flex items-center justify-center transition-all duration-300 ${subCategory.includes(subCat) ? 'bg-[#e09e86] border-[#e09e86]' : 'border-[#ffffff40] group-hover:border-white bg-[#ffffff05]'}`}>
                                      {subCategory.includes(subCat) && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                  </div>
                                  <input type="checkbox" value={subCat} className='hidden' onChange={toggleSubCategory} />
                                  <span className={`${subCategory.includes(subCat) ? 'text-white font-medium' : 'text-[#a0a0a0]'} text-[14px] transition-colors group-hover:text-white`}>{subCat}</span>
                              </label>
                          ))}
                      </div>
                  </div>

                  {/* Price Range Filter */}
                  <div className='mb-12'>
                      <h4 className='text-[#e09e86] text-[11px] font-bold tracking-[0.2em] mb-6 uppercase'>Price Range</h4>
                      <div className='w-full'>
                          <input 
                              type="range" 
                              min="100" 
                              max="10000" 
                              step="100" 
                              value={maxPrice} 
                              onChange={(e) => setMaxPrice(Number(e.target.value))}
                              className="w-full h-1 bg-[#ffffff20] rounded-lg appearance-none cursor-pointer outline-none"
                              style={{ 
                                  background: `linear-gradient(to right, #e09e86 0%, #e09e86 ${(maxPrice-100)/99}%, #ffffff20 ${(maxPrice-100)/99}%, #ffffff20 100%)`
                              }}
                          />
                          <div className='flex justify-between items-center mt-4 text-[12px] text-[#808080] font-medium'>
                              <span>₹ 100</span>
                              <span className='text-white font-bold tracking-widest'>Up to ₹ {maxPrice}</span>
                          </div>
                      </div>
                  </div>

                  {/* Rating Filter */}
                  <div className='mb-12'>
                      <h4 className='text-[#e09e86] text-[11px] font-bold tracking-[0.2em] mb-6 uppercase'>Rating</h4>
                      <div className='flex flex-col gap-3'>
                          {[4, 3].map(rating => (
                              <label key={rating} className='flex items-center gap-4 cursor-pointer group'>
                                  <div onClick={() => setMinRating(minRating === rating ? 0 : rating)} className={`w-[20px] h-[20px] rounded-[4px] border flex items-center justify-center transition-all duration-300 ${minRating === rating ? 'bg-[#e09e86] border-[#e09e86]' : 'border-[#ffffff40] group-hover:border-white bg-[#ffffff05]'}`}>
                                      {minRating === rating && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                  </div>
                                  <span onClick={() => setMinRating(minRating === rating ? 0 : rating)} className={`${minRating === rating ? 'text-white' : 'text-[#a0a0a0]'} font-medium text-[14px] transition-colors group-hover:text-white`}>{rating}★ & above</span>
                              </label>
                          ))}
                      </div>
                  </div>
              </div>
          </div>

          {/* Main Content */}
          <div className='flex-1 md:pl-12'>
              {/* Toolbar */}
              <div className='flex flex-col xl:flex-row justify-between xl:items-center mb-10 gap-6 border-b border-[#ffffff0a] pb-6 mt-8 md:mt-0'>
                  <div className='flex items-center gap-4 flex-wrap'>
                      <span className='text-[#808080] text-[14px]'>Showing <strong className='text-white'>{filterProduct?.length}</strong> of {products.length}</span>
                      {category.map(tag => (
                          <div key={tag} onClick={() => toggleCategory({target:{value:tag}})} className='flex items-center gap-2 px-4 py-[6px] rounded-full border border-[#e09e8640] bg-[#e09e8610] text-[12px] text-[#e09e86] cursor-pointer hover:bg-[#e09e8620] transition-colors font-medium'>
                              {tag} <span className='text-[10px] ml-1 opacity-60'>✕</span>
                          </div>
                      ))}
                      {subCategory.map(tag => (
                          <div key={tag} onClick={() => toggleSubCategory({target:{value:tag}})} className='flex items-center gap-2 px-4 py-[6px] rounded-full border border-[#e09e8640] bg-[#e09e8610] text-[12px] text-[#e09e86] cursor-pointer hover:bg-[#e09e8620] transition-colors font-medium'>
                              {tag} <span className='text-[10px] ml-1 opacity-60'>✕</span>
                          </div>
                      ))}
                  </div>

                  <div className='flex items-center gap-4'>
                      <div className='flex bg-[#ffffff08] rounded-md p-1 border border-[#ffffff10]'>
                          <div className='w-8 h-8 rounded shrink-0 flex items-center justify-center bg-[#ffffff20] cursor-pointer'>
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z"/></svg>
                          </div>
                          <div className='w-8 h-8 rounded shrink-0 flex items-center justify-center cursor-pointer hover:bg-[#ffffff10]'>
                              <svg className="w-4 h-4 text-[#808080]" fill="currentColor" viewBox="0 0 24 24"><path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z"/></svg>
                          </div>
                      </div>

                      <select className='bg-[#1a1517] border border-[#ffffff20] text-white text-[13px] px-4 py-2 flex-1 xl:flex-none h-10 rounded-md outline-none focus:border-[#e09e86] transition-colors cursor-pointer appearance-none' style={{backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em', paddingRight: '2.5rem'}} onChange={(e)=>SetSortType(e.target.value)}>
                          <option value="relavent">Sort: Relevance</option>
                          <option value="low-high">Sort: Low to High</option>
                          <option value="high-low">Sort: High to Low</option>
                      </select>
                  </div>
              </div>

              {/* Grid */}
              <div className='grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6'>
                  {filterProduct.map((item,index)=>(
                      <Card key={index} id={item._id} name={item.name} price={item.price} image={item.image1}/>
                  ))}
              </div>
              
          </div>
      </div>
    </div>
  )
}

export default Collections