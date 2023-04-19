import React, { useEffect, useState } from 'react';
import './style.css'
function Task({ task, onEdit, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [status, setStatus] = useState(task.status);
    const [dueDate, setDueDate] = useState(task.dueDate);
  
    const handleEdit = () => {
      onEdit({
        id: task.id,
        title,
        description,
        status,
        dueDate,
      });
      setIsEditing(false);
    };
  
    const handleDelete = () => {
      onDelete(task.id);
    };
  
    return (
      <div className='task-container'>
        {isEditing ? (
          <div>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            <button onClick={handleEdit}>Save</button>
          </div>
        ) : (
          <div>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <p>Due Date: {task.dueDate}</p>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        )}
      </div>
    );
  }
  
  function TaskList({ tasks, onEdit, onDelete }) {
    return (
      <div>
        {tasks?.map((task) => (
          <Task key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </div>
    );
  }

export default TaskList;