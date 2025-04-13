import express from 'express';
const router = express.Router();
import {createTemplate, getTemplates, updateEmailTemplate, deleteEmailTemplate} from '../controllers/emailTemplateController.js'
import { protect } from '../middlewares/authMiddleware.js';

router.post('/add-email', protect, createTemplate);
router.delete('/:id', protect, deleteEmailTemplate);
router.put('/:id', protect, updateEmailTemplate); // also adding PUT
router.get('/', protect, getTemplates);

export default router;