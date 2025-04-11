import express from 'express';
const router = express.Router();
import {createCampaign, getCampaigns} from '../controllers/campaignController.js'
import { protect } from '../middlewares/authMiddleware.js';

router.post('/add-campaign', protect, createCampaign);
router.get("/:id", protect, getCampaigns)

export default router;