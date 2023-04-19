import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskTracker from './pages/taskTracker';
import LoginScreen from './pages/login';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';
import {db} from './services/firebase';
import 'firebase/firestore';
import { doc, getDoc, setDoc } from "firebase/firestore";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/home" element={<TaskTracker />} />
      </Routes>
    </Router>

  );
  }

export default App;


