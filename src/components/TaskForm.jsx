import React, { useState } from 'react';
import {task_status} from '../constants';
import './style.css'

function TaskForm({ onCreate }) {
    const {IN_PROGRESS, COMPLETED} = task_status;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState(IN_PROGRESS);
    const [dueDate, setDueDate] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onCreate({
        title,
        description,
        status,
        dueDate,
      });
      setTitle('');
      setDescription('');
      setStatus(IN_PROGRESS);
      setDueDate('');
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input placeholder="Task Name" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value={IN_PROGRESS}>{IN_PROGRESS}</option>
          <option value={COMPLETED}>{COMPLETED}</option>
        </select>
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        <button type="submit">Create</button>
      </form>
    );
  }

export default TaskForm;