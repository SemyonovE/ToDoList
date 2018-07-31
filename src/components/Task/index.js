import React, { Component } from 'react';

import "./style.css"

class Task extends Component {
  render() {
    const {task} = this.props

    const bodyDate = task.finished.length > 0 ? task.finished : task.date
    const status = task.finished.length > 0 ? "finished" : (Date.parse(task.date) > (new Date()) ? "": "overdue")
    return (
      <li className={status}>
        <span className="task-title">{task.title}</span>
        <span className="task-text">{task.text}</span>
        <span className="task-date">{bodyDate}</span>
        <span className="task-status"></span>
        <span className="task-importance">{"!".repeat(task.importance * (task.finished.length === 0))}</span>
        <button>edit</button>
        <button>X</button>
      </li>
    );
  }
}

export default Task;