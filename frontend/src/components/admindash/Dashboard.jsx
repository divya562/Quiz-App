import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = ({ open }) => {
  const [quizCount, setQuizCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [attemptCount, setAttemptCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      const token = localStorage.getItem('token'); 

      try {
        const [quizRes, userRes] = await axios.all([
          axios.get('http://localhost:5000/api/quizzes/all', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get('http://localhost:5000/api/scores/all', {
            headers: { Authorization: `Bearer ${token}` }
          }),
        ]);
        
        setQuizCount(quizRes.data.length);
        setUserCount(userRes.data.length);
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className={`flex flex-row justify-center mt-36 py-8 px-8 gap-10 w-[calc(100%-320px)] ${!open ? 'w-[calc(100%-80px)] ml-20' : 'ml-80'} bg-no-repeat bg-cover`}>
      <div className="bg-gradient-to-r from-green-600 to-green-300 text-white shadow-lg rounded-lg border border-white md:w-[23%] w-80">
        <div className="text-4xl text-center p-6">{quizCount}</div>
        <div className="text-center text-2xl px-4 py-2">Total Quizzes</div>
      </div>

      <div className="bg-gradient-to-r from-orange-400 to-orange-300 text-white shadow-md rounded-lg border border-white md:w-[23%] w-80">
        <div className="text-4xl text-center p-6">{userCount}</div>
        <div className="text-center text-2xl px-4 py-2">Total Users</div>
      </div>

      <div className="bg-gradient-to-r from-blue-500 to-blue-300 text-white shadow-md rounded-lg border border-white md:w-[23%] w-80">
        <div className="text-4xl text-center p-6">{userCount}</div>
        <div className="text-center text-2xl px-4 py-2">Total Attempts</div>
      </div>
    </div>
  );
};

export default Dashboard;
