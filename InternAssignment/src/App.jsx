import { useState } from 'react'
import Login from '../src/Components/Login/Login'
import './App.css'
import Navbar from './Components/Header/Navbar'
import AdminDashboard from './Components/Header/AdminDashboard'
import AvailabilityForm from './Components/Availabilty/AvailabilityForm'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  

  return (
    <div>
      <Router>
      
      <Routes>
        <Route path="/:id" element={ <Navbar />} />
       
        <Route path="/" element={ <Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/:id/availability" element={<AvailabilityForm />} />
      </Routes>
    </Router>
    </div>
     
  )
}

export default App
