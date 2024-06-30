import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Question from './Question';

const QuizPage = () => {
  const { quizId } = useParams(); 
  const navigate = useNavigate(); 
  const [quiz, setQuiz] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); 
  const [quizExpired, setQuizExpired] = useState(false); 

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/quizzes/${quizId}/testquestions`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = response.data;

        if (data.length > 0) {
          setQuiz(data.map(question => ({ ...question, selectedOption: '' }))); 
          setTimeLeft(data[0].time * 60); 
          const quizEndTime = new Date(data[0].endTime).getTime(); 
          const currentTime = new Date().getTime();
          if (currentTime > quizEndTime) {
            setQuizExpired(true);
          }
        } else {
          console.error('No quiz data found');
        }
      } catch (error) {
        console.error('Error fetching quiz:', error);
      }
    };

    fetchQuiz();
  }, [quizId]);

  useEffect(() => {
    if (quiz.length > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(interval);
            setQuizExpired(true);
            return 0;
          }
          return prevTime - 1;
        });
        setTimerInterval(interval);

        return () => clearInterval(interval);
      }, 1000);
    }
  }, [quiz]);

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => Math.min(prevIndex + 1, quiz.length - 1));
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleSubmit = async () => {
    try {
      const submissionData = {
        userId: localStorage.getItem('userId'),
        quizId,
        answers: quiz.map((question) => ({
          questionId: question._id,
          userAnswer: question.selectedOption
        }))
      };

      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/scores/submit', submissionData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log('Quiz submitted:', response.data);

      navigate(`/quiz-result/${quizId}`); 
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  const handleOptionChange = (questionId, selectedOption) => {
    setQuiz(prevQuiz =>
      prevQuiz.map(question =>
        question._id === questionId ? { ...question, selectedOption } : question
      )
    );
  };

  if (quiz.length === 0) {
    return <div>Loading quiz...</div>;
  }

  if (quizExpired) {
    return <div>Sorry, the quiz has expired.</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-purple-600">
      <div className="p-10 rounded-lg shadow-lg w-full max-w-4xl bg-white relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold bg-blue-500 text-white p-2 rounded">Quiz</h2>
          {/* <div className="text-blue-500 text-xl font-bold">
            Time Left: {Math.floor(timeLeft / 60)}:{('0' + (timeLeft % 60)).slice(-2)}
          </div> */}
        </div>
        <div className="bg-gray-100 rounded-lg shadow-lg p-4 mb-12">
          <Question
            question={quiz[currentQuestionIndex]}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={quiz.length}
            onNext={handleNextQuestion}
            onPrevious={handlePreviousQuestion}
            onOptionChange={handleOptionChange} 
          />
        </div>
        <div className="absolute bottom-4 right-4">
          <button
            onClick={handleSubmit}
            className={`bg-red-500 text-white px-4 py-2 rounded ${quizExpired ? 'cursor-not-allowed opacity-50' : ''}`}
            disabled={quizExpired}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
