import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskTracker from './pages/taskTracker';
import Login from './pages/login';
import Signup from './pages/signup';
import ForgotPassword from './pages/forgotPassword';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/"       element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/home"   element={<TaskTracker />} />
      </Routes>
    </Router>

  );
  }

export default App;


