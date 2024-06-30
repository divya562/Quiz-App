import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BiQuestionMark, BiEdit, BiTrash } from "react-icons/bi";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedQuiz, setExpandedQuiz] = useState(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const response = await axios.get(
          "http://localhost:5000/api/quizzes/all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setQuizzes(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.message || "An error occurred.");
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  const handleDelete = async (quizId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      await axios.delete(
        `http://localhost:5000/api/quizzes/${quizId}/deleteWholeQuiz`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setQuizzes((prevQuizzes) =>
        prevQuizzes.filter((quiz) => quiz._id !== quizId)
      );
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred.");
    }
  };

  const handleToggleQuestions = async (quizId) => {
    if (expandedQuiz && expandedQuiz.id === quizId) {
      // If already expanded, collapse it
      setExpandedQuiz(null);
    } else {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const response = await axios.get(
          `http://localhost:5000/api/quizzes/${quizId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setExpandedQuiz({ id: quizId, questions: response.data.questions });
      } catch (error) {
        setError(error.response?.data?.message || "An error occurred.");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mt-40">
      <h2 className="text-3xl font-bold mb-8 text-center">Quiz List</h2>
      {quizzes.length === 0 ? (
        <div className="text-center">No quizzes found.</div>
      ) : (
        <div className="overflow-hidden border border-gray-300 rounded-lg shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Time (minutes)
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {quizzes.map((quiz) => (
                <React.Fragment key={quiz._id}>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {quiz.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {quiz.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {quiz.timer / 60}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-2">
                      <button
                        onClick={() => handleToggleQuestions(quiz._id)}
                        className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                      >
                        <BiQuestionMark className="text-2xl" />
                      </button>
                      <Link
                        to={`/admin-dashboard/quiz/${quiz._id}/edit`}
                        className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                      >
                        <BiEdit className="text-2xl" />
                      </Link>
                      <button
                        onClick={() => handleDelete(quiz._id)}
                        className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                      >
                        <BiTrash className="text-2xl" />
                      </button>
                    </td>
                  </tr>
                  {expandedQuiz && expandedQuiz.id === quiz._id && (
                    <tr>
                      <td colSpan="4" className="px-6 py-4">
                        <div className="text-sm text-gray-800">
                          {expandedQuiz.questions.length === 0 ? (
                            <div className="py-4 px-6 bg-gray-100 rounded-md">
                              No questions found for this quiz.
                            </div>
                          ) : (
                            <ul className="list-none">
                              {expandedQuiz.questions.map((question, index) => (
                                <li key={index} className="mb-4">
                                  <div className="bg-white shadow-md rounded-lg p-4">
                                    <div className="mb-2">
                                      <strong className="text-blue-600">
                                        Q{index + 1}:
                                      </strong>{" "}
                                      {question.question}
                                    </div>
                                    <ul className="list-none">
                                      {question.options.map((option, i) => (
                                        <li
                                          key={i}
                                          className="flex items-center mb-2"
                                        >
                                          <strong className="text-green-600 mr-2">
                                            {String.fromCharCode(97 + i)}.{" "}
                                          </strong>{" "}
                                          <span>{option}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default QuizList;
