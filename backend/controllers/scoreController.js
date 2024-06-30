import asyncHandler from 'express-async-handler';
import Score from '../models/score.js';
import Quiz from '../models/quize.js';


const submitQuiz = async (req, res) => {
  const { userId, quizId, answers } = req.body;
  // console.log('Request Body:', req.body);

  try {
      const quiz = await Quiz.findById(quizId).populate('questions');

      if (!quiz) {
          return res.status(404).json({ message: 'Quiz not found' });
      }

      let score = 0;
      const scoreDetails = answers.map(answer => {
          const question = quiz.questions.find(q => q._id.toString() === answer.questionId);
          if (question) {
              const isCorrect = question.correctAnswer === answer.userAnswer;
              if (isCorrect) {
                  score++;
              }
              return {
                  questionId: answer.questionId,
                  userAnswer: answer.userAnswer,
                  isCorrect
              };
          } else {
              return {
                  questionId: answer.questionId,
                  userAnswer: answer.userAnswer,
                  isCorrect: false 
              };
          }
      });

      const newScore = new Score({
          userId,
          quizId,
          score,
          answers: scoreDetails
      });

      await newScore.save();

      res.status(200).json({ score, scoreDetails });
  } catch (error) {
      console.error('Error submitting quiz:', error);
      res.status(500).json({ message: 'Server Error' });
  }
};

const getScoresByUserAndQuiz = asyncHandler(async (req, res) => {
  const { userId, quizId } = req.params;

  try {
    const scores = await Score.find({ userId, quizId });
    res.json(scores);
  } catch (error) {
    console.error('Error fetching scores:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

const getAllScores = asyncHandler(async (req, res) => {
  const scores = await Score.find().populate('userId', 'name').populate('quizId', 'title questions');
  res.json(scores);
});

export { submitQuiz, getScoresByUserAndQuiz, getAllScores};
