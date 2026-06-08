import express from 'express'
import adminAuth from '../middleware/adminAuth.js'
import { getAnalytics } from '../controller/analyticsController.js'

const analyticsRoutes = express.Router()

analyticsRoutes.get("/", adminAuth, getAnalytics)

export default analyticsRoutes
