import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage'; // Import karein
import ProtectedRoute from './context/ProtectedRoute'; // Import karein
import Navbar from './components/Navbar'; // Import karein
import UpdatePasswordPage from './pages/UpdatePasswordPage';

function App() {
  return (
   <div className="min-h-screen bg-gray-50">
      <Navbar /> {/* Routes se pehle Navbar ko yahan rakhein */}
      <main>
        <Routes>
          {/* === Public Routes === */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* === Protected Routes === */}
          <Route element={<ProtectedRoute />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/update-password" element={<UpdatePasswordPage />} /> {/* Nayi route */}
    </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;