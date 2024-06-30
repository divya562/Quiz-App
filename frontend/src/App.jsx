import { useState } from 'react'
import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UserTestQuize from './components/userdash/UserTestQuize'
import Home from './components/Home';
import AdminDash from './components/admindash/AdminDash'
import QuizPage from './components/userdash/QuizePage'
import QuizresultPage from './components/userdash/QuizeResultPage'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'

function App() {
  const [role, setRole] = React.useState('');

  return (
    <>

  <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login/:userType" element={<LoginForm role={role} setRole={setRole} />} />
        <Route path="/signup/:userType" element={<SignupForm />} />
        <Route path="/admin-dashboard/*" element={role === 'admin' ? <AdminDash /> : <Navigate to="/login/admin" />} />
        <Route path="/user-dashboard" element={role === 'user' ? <UserTestQuize /> : <Navigate to="/login/user" />} />
        <Route path="/quiz/:quizId" element={<QuizPage />} />
        <Route path="/quiz-result/:quizId" element={<QuizresultPage />} />
     
      </Routes>
    </Router>

    </>
  )
}

export default App
