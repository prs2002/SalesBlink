import express from 'express';
const router = express.Router();
import {createCampaign, getCampaigns, deleteCampaign} from '../controllers/campaignController.js'
import { protect } from '../middlewares/authMiddleware.js';

router.post('/add-campaign', protect, createCampaign);
router.get("/", protect, getCampaigns)
router.delete('/:id', protect, deleteCampaign);

export default router;