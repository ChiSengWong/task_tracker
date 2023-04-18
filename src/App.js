import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginScreen from './pages/login';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';


function App() {
  const [tasks, setTasks] = useState([]);

  const handleCreate = (task) => {
    setTasks([...tasks, { id: Date.now(), ...task }]);
  };

  const handleEdit = (updatedTask) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === updatedTask.id) {
        return updatedTask;
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleDelete = (taskId) => {
  const updatedTasks = tasks.filter((task) => task.id !== taskId);
  setTasks(updatedTasks);
  };

  const homePage = () => {

    return (
    <React.Fragment>
      <h1>Task Tracker</h1>
      <TaskForm onCreate={handleCreate} />
      <TaskList tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} />
    </React.Fragment>
    );

  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={homePage()} />
        <Route path="/login" element={<LoginScreen />} />
      </Routes>
    </Router>


  
  );
  }

export default App;


