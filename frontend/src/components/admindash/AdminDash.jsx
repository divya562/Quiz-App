import React from 'react'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import Quizeform from './Quizeform'
import { Route, Routes } from 'react-router-dom'
import QuizeList from './QuizeList'
import EditQuizeModel  from './EditQuizeModel'
import Dashboard from './Dashboard'
import UserTest from './UserTest'


const AdminDash = () => {
  return (
    <>
     <Navbar />
      <Sidebar />
      <div className="ml-80"> 
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-quiz" element={<Quizeform />} />
          <Route path="/show-quiz" element={<QuizeList />} />
          <Route path="/show-usertest" element={<UserTest />} />
          <Route path="/quiz/:id/edit" element={<EditQuizeModel />} />          
        </Routes>
      </div>
    
    </>

  )
}

export default AdminDash