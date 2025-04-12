import express from 'express';
const router = express.Router();
import {createCampaign, getCampaigns, addContactToCampaign} from '../controllers/campaignController.js'
import { protect } from '../middlewares/authMiddleware.js';

router.post('/add-campaign', protect, createCampaign);
router.put('/:id/add-contact', addContactToCampaign);
router.get("/:id", protect, getCampaigns)

export default router;