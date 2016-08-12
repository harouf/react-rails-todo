import React, { Component, PropTypes } from 'react';

export default function Task({ task, deleteTask, toggleChecked }) {
  const taskClassName = task.checked ? 'checked' : '';
  return (
    <li className={taskClassName}>
      <button className="delete" onClick={deleteTask}>
        &times;
      </button>

      <input
        type="checkbox"
        readOnly
        checked={task.checked}
        onClick={toggleChecked}
      />
      <span className="text">
        {task.text}
      </span>
    </li>
  );
}

Task.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  task: PropTypes.object.isRequired,
  deleteTask: PropTypes.func.isRequired,
  toggleChecked: PropTypes.func.isRequired,
};
