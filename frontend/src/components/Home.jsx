import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-purple-600">
      <div className="bg-white bg-opacity-90 p-10 rounded-lg shadow-2xl text-center h-3/4 flex flex-col ">
        <h1 className="text-6xl font-extrabold mb-6 text-gray-800 drop-shadow-lg animate-pulse mt-32">Welcome to Quiz Application</h1>
        <p className="text-xl mb-10 text-gray-700 mt-10">
          Test your knowledge and challenge yourself with our exciting quizzes. Whether you're a student or an admin, there's something here for everyone!
        </p>
        <div className="flex space-x-8 justify-center">
          <Link 
            to="/login/user" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-full shadow-lg transform transition-transform hover:scale-110 hover:shadow-2xl"
          >
            Start Quiz
          </Link>
          <Link 
            to="/login/admin" 
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-10 rounded-full shadow-lg transform transition-transform hover:scale-110 hover:shadow-2xl"
          >
            Admin Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
