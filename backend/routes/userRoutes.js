import express from 'express';
const router = express.Router();
import {authUser,
    loginUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,} from '../controllers/userController.js'
import { protect } from '../middlewares/authMiddleware.js';

router.post('/logout',logoutUser);
router.post('/login',loginUser);
router.get('/auth',authUser);
router.route('/').get(protect, getUsers).post(registerUser);

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