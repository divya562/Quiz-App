import Quiz from '../models/quize.js';
import asyncHandler from 'express-async-handler'


const createQuiz = asyncHandler(async (req, res) => {
    const { title, description, timer, questions } = req.body;

    const quiz = new Quiz({
        title,
        description,
        timer,
        questions
    });

    const createdQuiz = await quiz.save();
    res.status(201).json(createdQuiz);
});

const getQuizzes = asyncHandler(async (req, res) => {
    const quizzes = await Quiz.find({});
    res.json(quizzes);
});

const getQuizById = asyncHandler(async (req, res) => {
    const quiz = await Quiz.findById(req.params.id);

    if (quiz) {
        res.json(quiz);
    } else {
        res.status(404);
        throw new Error('Quiz not found');
    }
});

const updateQuiz = asyncHandler(async (req, res) => {
    const { title, description, timer, questions } = req.body;

    const quiz = await Quiz.findById(req.params.id);

    if (quiz) {
        quiz.title = title;
        quiz.description = description;
        quiz.timer = timer;
        quiz.questions = questions;

        const updatedQuiz = await quiz.save();
        res.json(updatedQuiz);
    } else {
        res.status(404);
        throw new Error('Quiz not found');
    }
});

const deleteQuiz = asyncHandler(async (req, res) => {
    const quiz = await Quiz.findById(req.params.id);

    if (quiz) {
        await quiz.remove();
        res.json({ message: 'Quiz removed' });
    } else {
        res.status(404);
        throw new Error('Quiz not found');
    }
});


const deleteQuestion = asyncHandler(async (req, res) => {
    const quiz = await Quiz.findById(req.params.quizId);
  
    if (quiz) {
      quiz.questions = quiz.questions.filter(
        (question) => question._id.toString() !== req.params.questionId
      );
  
      await quiz.save();
      res.json({ message: 'Question removed from the quiz' });
    } else {
      res.status(404);
      throw new Error('Quiz not found');
    }
  });
  

  const getAllQuestions = asyncHandler(async (req, res) => {
    const quiz = await Quiz.findById(req.params.quizId);
  
    if (quiz) {
      res.json(quiz.questions);
    } else {
      res.status(404);
      throw new Error('Quiz not found');
    }
  });

  const getAllQuizzes = asyncHandler(async (req, res) => {
    const quizzes = await Quiz.find({}).populate('questions'); 
    res.json(quizzes);
  });

  const deleteWholeQuiz = asyncHandler(async (req, res) => {
    const quizId = req.params.id;
  
    const deletedQuiz = await Quiz.findOneAndDelete({ _id: quizId });
  
    if (!deletedQuiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
  
    res.json({ message: 'Quiz removed' });
  });
  

export  {
    getAllQuizzes,
    createQuiz,
    getQuizzes,
    getQuizById,
    updateQuiz,
    deleteQuiz,
    getAllQuestions,
    deleteQuestion,
    deleteWholeQuiz
};
