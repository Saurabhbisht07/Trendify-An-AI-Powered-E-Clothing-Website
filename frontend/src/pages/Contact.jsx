import React, { useState } from 'react'
import Title from '../component/Title'
import contact from "../assets/trendify-contact.png"
import NewLetterBox from '../component/NewLetterBox'
import axios from 'axios'
import { toast } from 'react-toastify'

function Contact() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Logistics & Delivery'
  });

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

  const handleApply = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${backendUrl}/api/job/apply`, formData);
      if (res.data.success) {
        toast.success(res.data.message);
        setIsModalOpen(false);
        setFormData({ name: '', email: '', phone: '', role: 'Logistics & Delivery' });
      }
    } catch (error) {
       console.log(error);
       toast.error("Failed to submit application");
    }
  }

  return (
    <div className='w-full min-h-screen bg-[#151113] pt-[120px] font-sans overflow-hidden relative'>
      
      <div className='mb-16'>
        <Title text1={'CONTACT'} text2={'US'}/>
      </div>

      <div className='max-w-[1200px] mx-auto px-8 md:px-16 flex flex-col lg:flex-row items-center justify-center gap-16 mb-24'>
        
        {/* Image Section */}
        <div className='w-full lg:w-1/2 flex justify-center relative'>
           <div className='absolute inset-0 bg-gradient-to-tl from-[#e09e86] to-transparent opacity-10 blur-3xl rounded-full'></div>
          <img src={contact} alt="Contact Us" className='w-full rounded-[2rem] shadow-2xl border border-[#ffffff10] relative z-10'/>
        </div>

        {/* Info Section */}
        <div className='w-full lg:w-1/2 flex flex-col gap-10 max-w-[500px]'>
            
            {/* Store Address */}
            <div>
                <h4 className='text-[#e09e86] text-[12px] font-bold tracking-[0.2em] mb-4 uppercase'>Our Store</h4>
                <div className='text-[#a0a0a0] text-[15px] leading-relaxed'>
                    <p>12345 SRV COLLECTION MUKHANI, HALDWANI</p>
                    <p>MUKHANI, HALDWANI, INDIA</p>
                </div>
                <div className='mt-4 text-[#a0a0a0] text-[15px] leading-relaxed'>
                    <p>Tel: 9761######</p>
                    <p>Email: souravbst007@gmail.com</p>
                </div>
            </div>

            <div className='w-full h-[1px] bg-[#ffffff10]'></div>

            {/* Careers */}
            <div>
                <h4 className='text-[#e09e86] text-[12px] font-bold tracking-[0.2em] mb-4 uppercase'>Careers at Trendify</h4>
                <p className='text-[#a0a0a0] text-[15px] mb-6'>Learn more about our teams, culture, and new job openings.</p>
                
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className='bg-transparent border border-[#ffffff40] text-white hover:bg-white hover:text-black transition-all duration-300 font-bold tracking-widest uppercase text-[12px] px-8 h-[50px] rounded-lg shadow-xl'
                >
                    Explore Jobs
                </button>
            </div>

        </div>
      </div>

      <NewLetterBox/>
      
      {/* Job Application Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#1a1517] w-full max-w-md rounded-2xl border border-[#ffffff15] shadow-2xl overflow-hidden relative">
            <div className="flex justify-between items-center p-6 border-b border-[#ffffff10]">
              <h3 className="text-[#e09e86] text-xl font-bold tracking-widest uppercase">Apply for a Job</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-[#a0a0a0] hover:text-white transition-colors text-2xl leading-none">&times;</button>
            </div>
            <form onSubmit={handleApply} className="p-6 flex flex-col gap-5">
              
              <div className="flex flex-col gap-2">
                <label className="text-[#e09e86] text-[12px] font-bold tracking-widest uppercase text-left">Full Name</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="bg-transparent border border-[#ffffff30] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#e09e86] transition-colors w-full tracking-wide" placeholder="Name" />
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-[#e09e86] text-[12px] font-bold tracking-widest uppercase text-left">Email Address</label>
                <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="bg-transparent border border-[#ffffff30] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#e09e86] transition-colors w-full tracking-wide" placeholder="name@gmail.com" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[#e09e86] text-[12px] font-bold tracking-widest uppercase text-left">Phone Number</label>
                <input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="bg-transparent border border-[#ffffff30] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#e09e86] transition-colors w-full tracking-wide" placeholder="+91 9876543210" />
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-[#e09e86] text-[12px] font-bold tracking-widest uppercase text-left">Job Category</label>
                <select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="bg-[#1a1517] border border-[#ffffff30] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#e09e86] transition-colors w-full tracking-wide cursor-pointer appearance-none">
                  <option value="Logistics & Delivery">Logistics & Delivery</option>
                  <option value="Packing & Warehouse">Packing & Warehouse</option>
                  <option value="Management & Operations">Management & Operations</option>
                  <option value="Tech & Development">Tech & Development</option>
                </select>
              </div>

              <button type="submit" className="mt-4 bg-[#e09e86] text-black font-bold tracking-widest uppercase text-[14px] px-8 py-4 rounded-lg shadow-xl hover:bg-white transition-all duration-300 w-full mb-2">
                Submit Application
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}

export default Contact

