import express from 'express';
const router = express.Router();
import {createTemplate, getTemplates, searchEmailTemplates} from '../controllers/emailTemplateController.js'
import { protect } from '../middlewares/authMiddleware.js';

router.post('/add-email', protect, createTemplate);
router.get('/search', protect, searchEmailTemplates);

router.get('/', protect, getTemplates);

export default router;