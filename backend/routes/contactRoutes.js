import express from 'express';
const router = express.Router();
import {createContact, getContacts, searchContacts} from '../controllers/contactController.js'
import { protect } from '../middlewares/authMiddleware.js';

router.post('/add-contact', protect, createContact);
router.get('/search', protect, searchContacts);

router.get('/', protect, getContacts);

export default router;