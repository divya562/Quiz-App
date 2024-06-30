import express from 'express';
import { registerUser, authUser } from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();
router.route('/signup/user').post(registerUser);

router.route('/signup/admin').post( registerUser);
router.route('/login/user').post((req, res) => authUser(req, res, 'user'));
router.route('/login/admin').post((req, res) => authUser(req, res, 'admin'));

router.route('/admin').get(protect, admin, (req, res) => {
    res.send('Admin access');
});

export default router;
