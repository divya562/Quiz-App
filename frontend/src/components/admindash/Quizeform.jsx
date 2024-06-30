import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const QuizForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [timer, setTimer] = useState(0);
  const [questions, setQuestions] = useState([
    {
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
    },
  ]);
  const [error, setError] = useState(null);

  const addQuestion = () => {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      {
        question: "",
        options: ["", "", "", ""],
        correctAnswer: "",
      },
    ]);
  };

  const handlequestionChange = (index, newText) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[index].question = newText;
      return updatedQuestions;
    });
  };

  const handleOptionChange = (questionIndex, optionIndex, newOption) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[questionIndex].options[optionIndex] = newOption;
      return updatedQuestions;
    });
  };

  const handleCorrectAnswerChange = (questionIndex, correctAnswer) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[questionIndex].correctAnswer = correctAnswer;
      return updatedQuestions;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newQuiz = {
        title,
        description,
        timer: timer * 60,
        questions,
      };
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.post(
        "http://localhost:5000/api/quizzes/",
        newQuiz,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTitle("");
      setDescription("");
      setTimer(0);
      setQuestions([
        {
          question: "",
          options: ["", "", "", ""],
          correctAnswer: "",
        },
      ]);
      setError(null);
      alert("Quiz created successfully!");
      Navigate("/admin-dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred.");
      console.error("Error creating quiz:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-40 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Create New Quiz</h2>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Quiz Title
          </label>
          <input
            id="title"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter quiz title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter quiz description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="timer" className="block text-sm font-medium text-gray-700 mb-1">
            Timer (minutes)
          </label>
          <input
            id="timer"
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter quiz timer"
            value={timer}
            onChange={(e) => setTimer(parseInt(e.target.value, 10))}
            required
          />
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Questions</h3>
          {questions.map((question, index) => (
            <div key={index} className="border p-4 rounded-lg mb-4 bg-gray-50 shadow-md">
              <h4 className="text-base font-medium mb-2">Question {index + 1}</h4>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Question Text
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter question text"
                  value={question.question}
                  onChange={(e) => handlequestionChange(index, e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-2">
                {question.options.map((option, optionIndex) => (
                  <input
                    key={optionIndex}
                    type="text"
                    className="col-span-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-1"
                    placeholder={`Option ${optionIndex + 1}`}
                    value={option}
                    onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                    required
                  />
                ))}
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Correct Answer
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter correct answer"
                  value={question.correctAnswer}
                  onChange={(e) => handleCorrectAnswerChange(index, e.target.value)}
                  required
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addQuestion}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mb-4"
          >
            Add Question
          </button>
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Add Quiz
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuizForm;
