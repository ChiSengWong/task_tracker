import React, { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';
import {db} from './services/firebase';
import 'firebase/firestore';
import { doc, getDoc, setDoc } from "firebase/firestore";

function App() {
  /// Test user ***************************************
  const temp_userId = "123";
  const userRef = doc(db, "Users", temp_userId);
  /********************* TODO: get user id from auth */

  const [tasks, setTasks] = useState([]);

  // Get tasks from db on mount
  useEffect(() => {
    async function getTasks() {
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setTasks(userSnap.data().tasks);
      } else { //TODO: usersnap should be created when user signs up
        await setDoc(userRef, {
          tasks: []
        });
      }
    }
    getTasks();
  }, []);

  async function handleCreate(task){
    const updatedTasks = [...tasks, { id: Date.now(), ...task }];
    setTasks(updatedTasks);
    await updateTask(updatedTasks);
  };

  async function handleEdit(updatedTask){
    const updatedTasks = tasks.map((task) => {
      if (task.id === updatedTask.id) {
        return updatedTask;
      }
      return task;
    });
    setTasks(updatedTasks);
    await updateTask(updatedTasks);
  };

  const handleDelete = (taskId) => {
  const updatedTasks = tasks.filter((task) => task.id !== taskId);
  setTasks(updatedTasks);
  updateTask(updatedTasks);
  };

  async function updateTask(updatedTasks){
    await setDoc(userRef, {
      tasks: updatedTasks
    }).catch((error) => { console.error("Error writing document: ", error)})
  }

  return (
  <div>
  <h1>Task Tracker</h1>
  <TaskForm onCreate={handleCreate} />
  <TaskList tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} />
  </div>
  );
  }

export default App;


