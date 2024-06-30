import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/quizzes/all');
        setQuizzes(response.data);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-purple-600">
      <div className="p-10 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-4xl mb-6 text-center text-white font-bold">Welcome to Quiz App</h2>
        <div className="flex flex-wrap justify-center">
          {quizzes.map((quiz) => (
            <div key={quiz._id} className="max-w-md mx-4 my-8 bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{quiz.title}</div>
                <p className="text-gray-700 text-base mb-2">
                  <span className="font-semibold">Number of Questions:</span> {quiz.questions.length}
                </p>
                <p className="text-gray-700 text-base mb-2">
                  <span className="font-semibold">Total Marks:</span> {quiz.questions.length } 
                </p>
                <p className="text-gray-700 text-base mb-2">
                  <span className="font-semibold">Time:</span> {quiz.time} min
                </p>
                <Link
                  to={`/quiz/${quiz._id}`}
                  className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md text-center mt-4"
                >
                  Start Quiz
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizList;
