// TaskItem.jsx
import React from 'react';
// import './styles/TaskItem.css';

export default function TaskItem({
  task,
  toggleComplete,
  deleteTask,
  innerRef,
  dragHandleProps,
  draggableProps,
}) {
  return (
    <li
      className={`task-item ${task.completed ? 'completed' : ''}`}
      ref={innerRef}
      {...dragHandleProps}
      {...draggableProps}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleComplete(task.id)}
      />
      <span>{task.text}</span>
      <button className="delete-btn" onClick={() => deleteTask(task.id)}>
        🗑️
      </button>
    </li>
  );
}
