import React, { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import "./styles/taskTracker.css";
import { db } from "../services/firebase";
import "firebase/firestore";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

function TaskTracker() {
  const userRef = doc(db, "Users", localStorage.getItem("username"));
  const [tasks, setTasks] = useState([]);
  const [sortedList, setSortedList] = useState(tasks);

  // Get tasks from db on mount
  useEffect(() => {
    async function getTasks() {
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setTasks(userSnap.data().tasks);
        setSortedList(userSnap.data().tasks);
      } else {
        //TODO: usersnap should be created when user signs up
        await setDoc(userRef, {
          tasks: [],
        });
      }
    }
    getTasks();
  }, []);

  async function handleCreate(task) {
    const updatedTasks = [...tasks, { id: Date.now(), ...task }];
    setTasks(updatedTasks);
    await updateTask(updatedTasks);
  }

  async function handleEdit(updatedTask) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === updatedTask.id) {
        return updatedTask;
      }
      return task;
    });
    setTasks(updatedTasks);
    await updateTask(updatedTasks);
  }

  const handleDelete = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    updateTask(updatedTasks);
  };

  async function updateTask(updatedTasks) {
    await updateDoc(userRef, {
      tasks: updatedTasks,
    }).catch((error) => {
      console.error("Error writing document: ", error);
    });
  }
  // ---------------- Sort Function ----------------
  const [titleInput, setTitleInput] = useState("");


  const handleInputChange = (event) => {
    setTitleInput(event.target.value);
  };

  const [isCheckedIP, setIsCheckedIP] = useState(false);
  const [isCheckedF, setIsCheckedF] = useState(false);
  const [isCheckedDD, setIsCheckedDD] = useState(false);

  const handleCheckboxChangeIP = (event) => {
    setIsCheckedIP(event.target.checked);
  };
  const handleCheckboxChangeF = (event) => {
    setIsCheckedF(event.target.checked);
  };
  const handleCheckboxChangeDD = (event) => {
    setIsCheckedDD(event.target.checked);
  };

  useEffect(() => {
    // Sort functionality
    if (titleInput !== "") {
      setSortedList(
        sortedList.filter((element) => element.title.includes(titleInput))
      );
    } else {
      setSortedList(tasks);
    }

    if (isCheckedIP === true) {
      setSortedList(
        sortedList.filter((element) => element.status == "In Progress")
      );
    }

    if (isCheckedF === true) {
      setSortedList(
        sortedList.filter((element) => element.status == "Completed")
      );
    }
    if (isCheckedDD === true) {
      const sortedArray = Array.from(sortedList).sort((a, b) => {
        const dateA = new Date(a.dueDate);
        const dateB = new Date(b.dueDate);
        return dateA - dateB;
      });
      setSortedList(sortedArray);
    }

    if (tasks !== sortedList) {
        setSortedList(tasks)
    }

    console.log(sortedList);
  }, [titleInput, isCheckedIP, isCheckedF, isCheckedDD, tasks]);
  // ------------------------------------------------
  return (
    <React.Fragment>
      <>Search by title</>
      <input
        style={{ marginLeft: "10px", marginRight: "5px" }}
        value={titleInput}
        onChange={(event) => {
          handleInputChange(event);
        }}
      ></input>

      <input
        type="checkbox"
        style={{ marginLeft: "10px", marginRight: "5px" }}
        checked={isCheckedIP}
        onChange={handleCheckboxChangeIP}
      ></input>
      <>In progress</>
      <input
        type="checkbox"
        style={{ marginLeft: "10px", marginRight: "5px" }}
        checked={isCheckedF}
        onChange={handleCheckboxChangeF}
      ></input>
      <>Completed</>

      <input
        type="checkbox"
        style={{ marginLeft: "10px", marginRight: "5px" }}
        checked={isCheckedDD}
        onChange={handleCheckboxChangeDD}
      ></input>
      <>Sort by due date</>
      <h1>Task Tracker</h1>
      <TaskForm onCreate={handleCreate} />
      <TaskList
        tasks={sortedList}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </React.Fragment>
  );
}
export default TaskTracker;
