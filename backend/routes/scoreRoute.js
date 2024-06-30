import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import {
  getAllScores,
  getScoresByUserAndQuiz
} from '../controllers/scoreController.js';
import { submitQuiz } from '../controllers/scoreController.js';

const router = express.Router();

router.post('/submit', protect, submitQuiz);
router.get('/user/:userId/quiz/:quizId', protect, getScoresByUserAndQuiz);
router.route('/all').get(protect, admin, getAllScores);

export default router;
