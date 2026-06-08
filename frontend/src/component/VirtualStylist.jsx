import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import robotAi from '../assets/robot-ai.png';

const VirtualStylist = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: 'ai', text: "Hi! I'm your Trendify AI Stylist ✨ What's the occasion?" }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    const sendMessage = async () => {
        if (!input.trim()) return;
        
        const userText = input;
        setMessages(prev => [...prev, { sender: 'user', text: userText }]);
        setInput('');
        setLoading(true);

        try {
            const res = await axios.post(`${backendUrl}/api/stylist/ask`, { prompt: userText });
            if (res.data.success) {
                setMessages(prev => [...prev, { sender: 'ai', text: res.data.answer }]);
            } else {
                setMessages(prev => [...prev, { sender: 'ai', text: res.data.message || "Oops, something went wrong!" }]);
            }
        } catch (error) {
            setMessages(prev => [...prev, { sender: 'ai', text: "Sorry, I am having trouble connecting to the styling engine right now." }]);
        }
        setLoading(false);
    };

    return (
        <div className="fixed bottom-[200px] right-[5%] z-[60] lg:bottom-[160px] md:bottom-[180px]">
            {/* Chat Window */}
            {isOpen && (
                <div className="absolute bottom-[80px] right-0 w-[300px] sm:w-[350px] h-[450px] bg-[#1a1517] border border-[#ffffff20] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fadeIn">
                    <div className="bg-gradient-to-r from-[#d97d66] to-[#e4ac7a] px-5 py-4 text-white font-bold flex justify-between items-center shadow-md">
                        <span className="flex items-center gap-2">✨ AI Stylist</span>
                        <button onClick={() => setIsOpen(false)} className="hover:text-black transition-colors text-xl leading-none">&times;</button>
                    </div>
                    
                    <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`max-w-[85%] rounded-xl px-4 py-2 text-[14px] leading-relaxed shadow-sm ${msg.sender === 'user' ? 'bg-[#ffffff15] border border-[#ffffff10] text-white self-end rounded-br-none' : 'bg-gradient-to-r from-[#d97d66] to-[#e4ac7a] text-black self-start rounded-bl-none font-medium'}`}>
                                {msg.text}
                            </div>
                        ))}
                        {loading && (
                            <div className="bg-gradient-to-r from-[#d97d66] to-[#e4ac7a] text-black w-14 h-9 flex justify-center items-center rounded-xl rounded-bl-none self-start">
                                <span className="animate-pulse text-lg tracking-widest">...</span>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="p-3 border-t border-[#ffffff10] flex gap-2 bg-[#151113]">
                        <input 
                            value={input} 
                            onChange={(e) => setInput(e.target.value)} 
                            onKeyPress={(e) => e.key === 'Enter' && sendMessage()} 
                            placeholder="Ask for style advice..." 
                            className="flex-1 bg-transparent border border-[#ffffff30] text-white text-[14px] rounded-full px-4 outline-none focus:border-[#e09e86] transition-colors" 
                        />
                        <button onClick={sendMessage} className="w-10 h-10 bg-gradient-to-r from-[#d97d66] to-[#e4ac7a] flex justify-center items-center rounded-full text-black hover:scale-110 transition-transform shadow-lg font-bold">
                            ➔
                        </button>
                    </div>
                </div>
            )}

            {/* Toggle Button */}
            <div 
                onClick={() => setIsOpen(!isOpen)} 
                className={`w-[65px] h-[65px] bg-gradient-to-r from-[#d97d66] to-[#e4ac7a] rounded-full shadow-[0_0_20px_#e09e8666] flex justify-center items-center cursor-pointer hover:scale-110 transition-transform overflow-hidden ${isOpen ? 'scale-110' : ''}`}
            >
                <img src={robotAi} alt="AI Stylist" className="w-full h-full object-cover rounded-full" />
            </div>
        </div>
    );
};

export default VirtualStylist;
