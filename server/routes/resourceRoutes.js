// routes/reportRoutes.js
import express from 'express';
import { createReport, getReports } from '../controllers/reportController.js';
import { protect } from '../middleware/auth.js';
const router = express.Router();
router.post('/', createReport);
router.get('/', protect, getReports); // only agencies can view
export default router;