import React from 'react'

function NewLetterBox() {
    const handleSubmit = (e)=>{
        e.preventDefault()
    }
  return (
    <div className='w-full bg-[#110e10] py-24 flex flex-col items-center justify-center relative overflow-hidden'>
        
        {/* Decorative Background Elements */}
        <div className="absolute top-[-50%] left-[-10%] w-[500px] h-[500px] border-[1px] border-[#ffffff05] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-[-30%] right-[-10%] w-[400px] h-[400px] border-[1px] border-[#ffffff05] rounded-full pointer-events-none"></div>

        <div className='relative z-10 flex flex-col items-center text-center px-8'>
            <h3 className='text-[#e09e86] text-[12px] font-bold tracking-[0.2em] mb-4 uppercase'>Join the Club</h3>
            <h2 className='text-[35px] md:text-[50px] font-serif text-white mb-4 leading-tight'>
                <span className='font-light italic text-[#e09e86]'>Subscribe</span> & Get 20% Off
            </h2>
            <p className='text-[#808080] text-[15px] max-w-[500px] mb-10 leading-relaxed'>
                Join our exclusive mailing list and enjoy instant savings, special deals, and early access to new collections directly to your inbox.
            </p>

            <form onSubmit={handleSubmit} className='w-full max-w-[600px] flex flex-col sm:flex-row gap-4'>
                <input 
                    type="email" 
                    placeholder='Enter your email address' 
                    className='flex-1 bg-[#1a1517] h-14 border border-[#ffffff15] rounded-lg px-6 text-white placeholder:text-[#ffffff40] outline-none focus:border-[#e09e86] transition-colors shadow-lg' 
                    required 
                />
                <button 
                    type='submit' 
                    className='h-14 bg-gradient-to-r from-[#d97d66] to-[#e4ac7a] text-white px-8 rounded-lg text-[13px] font-bold tracking-[0.1em] uppercase hover:opacity-90 transition-opacity shadow-lg shrink-0'>
                    Subscribe
                </button>
            </form>
        </div>
    </div>
  )
}

export default NewLetterBox
