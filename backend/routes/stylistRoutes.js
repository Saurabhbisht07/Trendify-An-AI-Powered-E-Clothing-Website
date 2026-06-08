import express from 'express';
import { getStylistAdvice } from '../controller/stylistController.js';

const stylistRoutes = express.Router();

stylistRoutes.post('/ask', getStylistAdvice);

export default stylistRoutes;
