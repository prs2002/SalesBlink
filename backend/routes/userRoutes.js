import express from 'express';
const router = express.Router();
import {authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,} from '../controllers/userController.js'
import { protect } from '../middlewares/authMiddleware.js';

router.route('/').get(protect, getUsers).post(registerUser);
router.post('/logout',logoutUser);
router.post('/login',authUser);
router
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);
router
    .route('/:id')
    .delete(protect, deleteUser)
    .get(protect, getUserById)
    .put(protect, updateUser);

export default router;