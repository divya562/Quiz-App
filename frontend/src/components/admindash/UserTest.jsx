import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserTestResults = () => {
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestResults = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get('http://localhost:5000/api/scores/all', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setTestResults(response.data);
        console.log(response);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.message || 'An error occurred.');
        setLoading(false);
      }
    };

    fetchTestResults();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-40">
      <h2 className="text-3xl font-bold mb-8 text-center">User Test Results</h2>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">User Name</th>
              <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">Test Title</th>
              <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">Total Questions</th>
              <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">Total Marks</th>
              <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {testResults.map((result, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="px-6 py-4 whitespace-nowrap text-center">{result.userId?.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">{result.quizId?.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">{result.quizId?.questions.length}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">{result.quizId?.questions.length}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">{result.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTestResults;
