import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import FlowEditor from './pages/FlowEditor';
import RegisterPage from './pages/auth/RegisterPage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
          
          <Route path="/editor" element={<PrivateRoute><FlowEditor /></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;