import React, { useEffect, useState, useContext } from 'react';
import Nav from '../component/Nav';
import Sidebar from '../component/Sidebar';
import { adminDataContext } from '../context/AdminContext';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

function JobApplications() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { serverUrl } = useContext(authDataContext);

  const fetchJobs = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/job/list`, { withCredentials: true });
      setJobs(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error('Failed to load applications');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      const res = await axios.post(`${serverUrl}/api/job/status`, { id, status }, { withCredentials: true });
      if (res.data.success) {
        toast.success(res.data.message);
        fetchJobs(); // refresh list
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to update status');
    }
  };

  return (
    <div className='w-[100vw] min-h-[100vh] bg-[#151113] text-[white] relative'>
       <Nav />
       <Sidebar />

       <div className='w-[70vw] absolute left-[25%] flex items-Start justify-start flex-col gap-[40px] py-[100px]'>
          <h1 className='text-[40px] md:text-[55px] font-serif tracking-widest uppercase mb-6 text-white'>
             <span className='text-[#e09e86] italic font-light pr-4'>Job</span>Applications
          </h1>

          {loading ? (
             <div className="w-full flex items-center justify-center p-20">
                <div className="text-[#e09e86] text-2xl font-bold tracking-widest animate-pulse">Loading Applications...</div>
             </div>
          ) : (
             <div className='w-full'>
                <div className='flex flex-col gap-4'>
                   {jobs.length === 0 ? (
                      <p className='text-[#a0a0a0] text-xl'>No applications found.</p>
                   ) : (
                      jobs.map((job) => (
                         <div key={job._id} className='bg-[#1a1517e6] backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-[#ffffff15] hover:border-[#e09e86] transition-colors flex flex-col md:flex-row justify-between items-start md:items-center gap-6'>
                            <div className='flex flex-col gap-2'>
                               <h3 className='text-2xl font-bold text-white tracking-wider'>{job.name}</h3>
                               <p className='text-[#e09e86] font-semibold text-sm tracking-widest uppercase'>{job.role}</p>
                               <div className='text-[#a0a0a0] text-sm mt-2'>
                                  <p>Email: {job.email}</p>
                                  <p>Phone: {job.phone}</p>
                                  <p>Date: {new Date(job.date).toLocaleDateString()}</p>
                               </div>
                            </div>
                            
                            <div className='flex flex-col gap-2 w-full md:w-auto mt-4 md:mt-0'>
                               <label className='text-[12px] text-[#a0a0a0] tracking-widest uppercase'>Update Status:</label>
                               <select 
                                  value={job.status} 
                                  onChange={(e) => handleStatusChange(job._id, e.target.value)}
                                  className='bg-transparent border border-[#e09e86] text-white px-4 py-2 rounded-lg outline-none cursor-pointer hover:bg-[#e09e86] hover:text-black transition-colors font-bold tracking-widest'
                               >
                                  <option className='text-black' value="Pending">Pending</option>
                                  <option className='text-black' value="Contacted">Contacted</option>
                                  <option className='text-black' value="Rejected">Rejected</option>
                               </select>
                            </div>
                         </div>
                      ))
                   )}
                </div>
             </div>
          )}
       </div>
    </div>
  );
}

export default JobApplications;
