import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 

const AllQuize = () => {
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
    <div className="flex flex-wrap justify-center">
      {quizzes.map((quiz) => (
        <div key={quiz._id} className="max-w-sm rounded overflow-hidden shadow-lg m-4">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{quiz.title}</div>
            <p className="text-gray-700 text-base">{quiz.description}</p>
            <p className="text-gray-700 text-base">Total Questions: {quiz.questions.length}</p>
            <p className="text-gray-700 text-base">Time: {quiz.time} minutes</p>
          </div>
          <div className="px-6 py-4">
            <Link
              to={`/quizzes/${quiz._id}`} 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Start Exam
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllQuize;
