// backend/routes/emailRoutes.js
import express from 'express';
import { scheduleEmail } from '../controllers/scheduleEmailController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();
router.post('/email', protect, scheduleEmail);

export default router;