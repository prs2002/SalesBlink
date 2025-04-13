import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import FlowEditor from './pages/FlowEditor';
import RegisterPage from './pages/auth/RegisterPage';
import PrivateRoute from './components/PrivateRoute';
import FlowBuilder from './pages/FlowBuilder';
import Contacts from './pages/Contacts';
import EmailTemplates from './pages/EmailTemplates';
import Campaigns from './pages/Campaigns';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/flow-builder" element={<PrivateRoute><FlowBuilder /></PrivateRoute>} />
          <Route path="/flow-builder/:campaignId" element={<PrivateRoute><FlowBuilder /></PrivateRoute>} />
          <Route path="/contacts" element={<PrivateRoute><Contacts /></PrivateRoute>} />
          <Route path="/templates" element={<PrivateRoute><EmailTemplates /></PrivateRoute>} />
          <Route path="/campaigns" element={<PrivateRoute><Campaigns /></PrivateRoute>} />
          <Route path="/editor" element={<PrivateRoute><FlowEditor /></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;