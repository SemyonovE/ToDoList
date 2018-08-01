import React from "react";
import PropTypes from "prop-types";

import { Panel } from "react-bootstrap";

import TaskHeader from "../TaskHeader";
import TaskBody from "../TaskBody";
import TaskEditor from "../TaskEditor";

import "./style.css";

//The component receive the task and display its
class Task extends React.Component {
  static propTypes = {
    task: PropTypes.object,
    deleteTask: PropTypes.func,
    editTask: PropTypes.func
  };

  state = {
    editMode: false
  };

  render() {
    const { task } = this.props;

    //Determining status of the current task for change its' style
    const status = task.finished
      ? "success"
      : Date.parse(task.date) > new Date() || !task.date
        ? ""
        : "danger";

    return (
      <div>
        {this.state.editMode ? (
          <TaskEditor task={task} toggleEditMode={this.toggleEditMode} />
        ) : (
          <Panel {...(status ? { bsStyle: status } : {})}>
            <TaskHeader task={task} toggleEditMode={this.toggleEditMode} />
            <TaskBody task={task} />
          </Panel>
        )}
      </div>
    );
  }

  toggleEditMode = () => {
    this.setState({
      editMode: !this.state.editMode
    });
  };
}

export default Task;
