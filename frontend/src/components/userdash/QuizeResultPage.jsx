import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const QuizresultPage = () => {
  const { quizId } = useParams(); 
  const [quizInfo, setQuizInfo] = useState({
    title: '',
    description: '',
    totalQuestions: 0,
    totalMarks: 0,
    passingPercentage: 30, 
  });
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchQuizInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/quizzes/${quizId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const { title, description, questions } = response.data;
        const totalQuestions = questions.length;
        const totalMarks = totalQuestions; 
        setQuizInfo({ title, description, totalQuestions, totalMarks });
      } catch (error) {
        console.error('Error fetching quiz info:', error);
      }
    };

    fetchQuizInfo();
  }, [quizId]);

  useEffect(() => {
    const fetchScore = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId'); 
        const response = await axios.get(`http://localhost:5000/api/scores/user/${userId}/quiz/${quizId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const latestScore = response.data.length > 0 ? response.data[response.data.length - 1].score : null;

        setScore(latestScore);
      } catch (error) {
        console.error('Error fetching score:', error);
      }
    };

    fetchScore();
  }, [quizId]); 

  if (score === null) {
    return <div className="flex justify-center items-center h-screen"><p className="text-lg">Loading score...</p></div>;
  }

  const percentageCorrect = ((score / quizInfo.totalMarks) * 100).toFixed(2);
  const passingPercentage = 30;
  const passOrFail = parseFloat(percentageCorrect) >= passingPercentage ? 'Pass' : 'Fail';
  const passOrFailColor = passOrFail === 'Pass' ? 'text-green-500' : 'text-red-500';

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-600 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full md:max-w-3xl">
        <h1 className="text-3xl font-bold mb-4 text-center">{quizInfo.title}</h1>
        <p className="text-lg text-gray-600 mb-8 text-center">{quizInfo.description}</p>
        <div className="bg-gray-200 rounded-lg p-6 mb-8 w-full md:max-w-3xl">
          <h2 className="text-xl font-semibold mb-4 text-center">Quiz Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col items-center md:items-start">
              <p className="text-sm text-gray-600 mb-1">Total Questions:</p>
              <p className="font-semibold text-lg">{quizInfo.totalQuestions}</p>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <p className="text-sm text-gray-600 mb-1">Total Marks:</p>
              <p className="font-semibold text-lg">{quizInfo.totalMarks}</p>
            </div>
            <div className="col-span-2 flex flex-col items-center md:items-start">
              <p className="text-sm text-gray-600 mb-1">Your Score:</p>
              <p className="font-semibold text-lg">{score} / {quizInfo.totalMarks}</p>
            </div>
          </div>
        </div>
        <div className={`text-2xl font-bold ${passOrFailColor} text-center mb-4`}>{passOrFail}</div>
        <div className="text-center">
          <p className="text-sm text-gray-600">Percentage Correct:</p>
          <p className="font-semibold text-lg">{percentageCorrect}%</p>
        </div>
      </div>
    </div>
  );
};

export default QuizresultPage;
