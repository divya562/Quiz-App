import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const SignupForm = () => {
  const { userType } = useParams(); 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = userType === 'admin' ? 'signup/admin' : 'signup/user';
      const formData = { name, email, password, role: userType }; 
      await axios.post(`http://localhost:5000/api/users/${endpoint}`, formData);
      navigate(`/login/${userType}`);
    } catch (error) {
      console.error('Signup error:', error);
      setError('Signup failed. Please try again.');
    }
  };

  const handleLoginUser = () => {
    navigate('/login/user');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-purple-600">
      <div className="bg-white bg-opacity-80 p-10 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl mb-6 text-center text-gray-800">Sign Up as {userType.charAt(0).toUpperCase() + userType.slice(1)}</h2>
        {error && <p className="text-red-500 text-xs italic">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="**********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign Up
            </button>
            {userType === 'user' && (
              <button
                type="button"
                onClick={handleLoginUser}
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 ml-4 focus:outline-none"
              >
                Login as User
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;