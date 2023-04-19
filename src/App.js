import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskTracker from './pages/taskTracker';
import LoginScreen from './pages/login';
import SignupScreen from './pages/signup';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/"       element={<LoginScreen />} />
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/home"   element={<TaskTracker />} />
      </Routes>
    </Router>

  );
  }

export default App;


