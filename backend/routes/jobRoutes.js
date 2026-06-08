import express from 'express';
import { applyJob, getJobs, updateJobStatus } from '../controller/jobController.js';
import adminAuth from '../middleware/adminAuth.js';

const jobRoutes = express.Router();

// public API
jobRoutes.post('/apply', applyJob);

// admin APIs
jobRoutes.get('/list', adminAuth, getJobs);
jobRoutes.post('/status', adminAuth, updateJobStatus);

export default jobRoutes;
