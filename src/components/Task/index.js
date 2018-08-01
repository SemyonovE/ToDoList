import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteTask } from "../../actionCreator";

import "./style.css";

//The component receive the task and display its
class Task extends React.Component {
  static propTypes = {
    task: PropTypes.object,
    deleteTask: PropTypes.func
  };

  render() {
    const { task } = this.props;

    //Determining status of the current task for change its' style
    const status =
      task.finished.length > 0
        ? "finished"
        : Date.parse(task.date) > new Date()
          ? ""
          : "overdue";

    return (
      <li className={status}>
        <span className="task-title">{task.title}</span>
        <span className="task-text">{task.text}</span>
        <span className="task-date">{task.date}</span>
        <span className="task-finished">{task.finished}</span>
        <span className="task-status" />
        <span className="task-importance">
          {"!".repeat(task.importance * (task.finished.length === 0))}
        </span>
        <button>edit</button>
        <button onClick={this.deleteTask}>X</button>
      </li>
    );
  }

  deleteTask = () => {
    const { deleteTask, task } = this.props;
    deleteTask(task.id);
  };
}

export default connect(
  null,
  { deleteTask }
)(Task);
