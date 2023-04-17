import React, { useState } from 'react';
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

  return (
  <div>
  <h1>Task Tracker</h1>
  <TaskForm onCreate={handleCreate} />
  <TaskList tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} />
  </div>
  );
  }

export default App;


