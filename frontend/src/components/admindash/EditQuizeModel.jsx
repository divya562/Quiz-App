import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditQuizModel = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [quiz, setQuiz] = useState(null); 
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get(`http://localhost:5000/api/quizzes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setQuiz(response.data);
        // console.log(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.message || 'An error occurred.');
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuiz({ ...quiz, [name]: value });
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[index][field] = value;
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[qIndex].options[oIndex] = value;
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleCorrectOptionChange = (qIndex, value) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[qIndex].correctOption = value;
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      question: '',
      options: ['', '', '', ''],
      correctOption
    };
    setQuiz({ ...quiz, questions: [...quiz.questions, newQuestion] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      await axios.put(`http://localhost:5000/api/quizzes/${id}`, quiz, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      navigate('/admin-dashboard/show-quiz'); 
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred.');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-40">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Quiz</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={quiz.title}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={quiz.description}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="timer">
            Time (minutes)
          </label>
          <input
            type="number"
            id="timer"
            name="timer"
            value={quiz.timer / 60}
            onChange={(e) => handleInputChange({ target: { name: 'timer', value: e.target.value * 60 } })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        {quiz.questions.map((question, qIndex) => (
          <div key={qIndex} className="mb-4 p-4 bg-gray-100 rounded shadow-md">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Question {qIndex + 1}
            </label>
            <input
              type="text"
              value={question.question}
              onChange={(e) => handleQuestionChange(qIndex, 'question', e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            <label className="block text-gray-700 text-sm font-bold mt-2">Options</label>
            {question.options.map((option, oIndex) => (
              <input
                key={oIndex}
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-1"
                required
              />
            ))}
            <label className="block text-gray-700 text-sm font-bold mt-2">Correct Option</label>
            <input
              type="number"
              value={question.correctAnswer}
              onChange={(e) => handleCorrectOptionChange(qIndex, e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
        ))}
        <div className="mb-4">
          <button
            type="button"
            onClick={handleAddQuestion}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Question
          </button>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditQuizModel;
