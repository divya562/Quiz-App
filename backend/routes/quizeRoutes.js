

import express from 'express';
import {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  updateQuiz,
  deleteQuiz,
  deleteWholeQuiz,
  getAllQuestions,
  deleteQuestion,
} from '../controllers/quizeController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, admin, createQuiz);


  router.route('/all')
  .get(getAllQuizzes);
  
router.route('/:id')
  .get(protect, getQuizById)
  .put(protect, admin, updateQuiz)
  .delete(protect, admin, deleteQuiz);

router.route('/:id/deleteWholeQuiz')
  .delete(protect, admin, deleteWholeQuiz);

router.route('/:quizId/questions')
  .get(protect, admin, getAllQuestions);

router.route('/:quizId/testquestions')
  .get( getAllQuestions);

router.route('/:quizId/questions/:questionId')
  .delete(protect, admin, deleteQuestion);

export default router;
