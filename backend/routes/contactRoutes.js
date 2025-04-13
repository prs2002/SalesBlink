import express from 'express';
const router = express.Router();
import {createContact, getContacts, deleteContact} from '../controllers/contactController.js'
import { protect } from '../middlewares/authMiddleware.js';

router.post('/add-contact', protect, createContact);
router.delete('/:id', protect, deleteContact);
router.get('/', protect, getContacts);

export default router;