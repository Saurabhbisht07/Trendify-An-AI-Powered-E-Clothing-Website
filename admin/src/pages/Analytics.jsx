import React, { useState, useEffect, useContext } from 'react';
import Nav from '../component/Nav';
import Sidebar from '../component/Sidebar';
import { adminDataContext } from '../context/AdminContext';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

import { authDataContext } from '../context/AuthContext';

function Analytics() {
  const { serverUrl } = useContext(authDataContext);
  const [data, setData] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    salesOverTime: [],
    topProducts: []
  });
  const [loading, setLoading] = useState(true);

  // Note: the backend context provides serverUrl from authDataContext or maybe adminContext
  // Looking at App.jsx and Home.jsx, admin uses authDataContext for serverUrl. Wait, Home.jsx imports authDataContext:
  // import { authDataContext } from '../context/AuthContext'
  // But wait! There is adminDataContext in context/AdminContext. I'll import both or just authDataContext.
  // Actually, I'll just import authDataContext like Home.jsx did, but wait! App.jsx imports adminDataContext.
  // Let me just import context the same way it's done elsewhere. 
  // Let's assume VITE_BACKEND_URL is used or I'll just hardcode localhost:6000 if serverUrl is missing. 
  // Wait, I can just copy what Home.jsx did.
  // Let me use fetch from authDataContext.
  // Actually, wait, let me just look at my code. Re-evaluating the server URL since I have to be sure it works without context errors.
  
  // To avoid unused or wrong context, I'll use the environment variable directly if possible, or context.
  
  const fetchAnalytics = async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/admin/analytics`, { withCredentials: true });
      setData(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch analytics", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <div className='w-[100vw] min-h-[100vh] bg-[#151113] text-[white] relative'>
      <Nav />
      <Sidebar />

      <div className='w-[70vw] absolute left-[25%] flex items-Start justify-start flex-col gap-[40px] py-[100px]'>
        <h1 className='text-[40px] md:text-[55px] font-serif tracking-widest uppercase mb-6 text-white'>
          <span className='text-[#e09e86] italic font-light pr-4'>Trendify</span>Analytics
        </h1>

        {loading ? (
          <div className="w-full flex items-center justify-center p-20">
             <div className="text-[#e09e86] text-2xl font-bold tracking-widest animate-pulse">Loading Analytics...</div>
          </div>
        ) : (
          <div className='w-full flex flex-col gap-10'>
            {/* Stats Cards */}
            <div className='flex items-center justify-start gap-[30px] flex-wrap'>
              <div className='text-white w-[300px] max-w-[90%] h-[150px] bg-[#1a1517e6] backdrop-blur-xl flex items-center justify-center flex-col gap-[15px] rounded-2xl shadow-2xl md:text-[22px] text-[18px] border border-[#ffffff15] hover:border-[#e09e86] transition-colors'>
                Total Revenue 
                <span className='px-[20px] py-[10px] text-[20px] bg-[#e09e86] text-black rounded-lg flex items-center justify-center font-bold tracking-widest'>
                  ₹{data.totalRevenue.toLocaleString()}
                </span>
              </div>
              <div className='text-white w-[300px] max-w-[90%] h-[150px] bg-[#1a1517e6] backdrop-blur-xl flex items-center justify-center flex-col gap-[15px] rounded-2xl shadow-2xl md:text-[22px] text-[18px] border border-[#ffffff15] hover:border-[#e09e86] transition-colors'>
                Total Orders
                <span className='px-[20px] py-[10px] text-[20px] bg-[#e09e86] text-black rounded-lg flex items-center justify-center font-bold tracking-widest'>
                  {data.totalOrders}
                </span>
              </div>
              <div className='text-white w-[300px] max-w-[90%] h-[150px] bg-[#1a1517e6] backdrop-blur-xl flex items-center justify-center flex-col gap-[15px] rounded-2xl shadow-2xl md:text-[22px] text-[18px] border border-[#ffffff15] hover:border-[#e09e86] transition-colors'>
                Total Users
                <span className='px-[20px] py-[10px] text-[20px] bg-[#e09e86] text-black rounded-lg flex items-center justify-center font-bold tracking-widest'>
                  {data.totalUsers}
                </span>
              </div>
            </div>

            {/* Charts */}
            <div className="flex flex-col gap-10 w-full xl:flex-row pb-[50px]">
                
                {/* Line Chart */}
                <div className='bg-[#1a1517e6] backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-[#ffffff15] flex-1 min-w-[300px]'>
                    <h2 className='text-[24px] font-serif tracking-widest text-center mb-8 text-[#e09e86] uppercase'>Sales Over Time</h2>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data.salesOverTime} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff22" />
                                <XAxis dataKey="_id" stroke="#fff" tick={{fill: '#fff'}} />
                                <YAxis stroke="#fff" tick={{fill: '#fff'}} />
                                <RechartsTooltip contentStyle={{backgroundColor: '#1a1517e6', border: '1px solid #e09e86', borderRadius: '10px'}} itemStyle={{color: '#e09e86'}} />
                                <Legend wrapperStyle={{paddingTop: '20px'}}/>
                                <Line type="monotone" name="Sales (₹)" dataKey="sales" stroke="#e09e86" strokeWidth={3} activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Bar Chart */}
                <div className='bg-[#1a1517e6] backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-[#ffffff15] flex-1 min-w-[300px]'>
                    <h2 className='text-[24px] font-serif tracking-widest text-center mb-8 text-[#e09e86] uppercase'>Top Selling Products</h2>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data.topProducts} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff22" />
                                <XAxis dataKey="_id" stroke="#fff" tick={{fill: '#fff'}} tickFormatter={(str) => { return str.length > 10 ? str.substring(0, 10) + '...' : str }} />
                                <YAxis stroke="#fff" tick={{fill: '#fff'}} />
                                <RechartsTooltip contentStyle={{backgroundColor: '#1a1517e6', border: '1px solid #e09e86', borderRadius: '10px'}} itemStyle={{color: '#e09e86'}} />
                                <Legend wrapperStyle={{paddingTop: '20px'}}/>
                                <Bar dataKey="sold" name="Units Sold" fill="#e09e86" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Analytics;
