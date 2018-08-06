import React from "react";
import PropTypes from "prop-types";

import { Panel, Modal } from "react-bootstrap";

import TaskHeader from "./TaskHeader";
import TaskBody from "./TaskBody";
import TaskEditor from "./TaskEditor";

import { taskType } from "../types";
import noSetFunction from "../helpers/notSetFunction";

// The component receive the task and display its
class Task extends React.Component {
  static propTypes = {
    task: taskType.isRequired, // Object of the task
    deleteTask: PropTypes.func, // Function for deleting of the task
    editTask: PropTypes.func, // Function for editing of the task
    taskliststyle: PropTypes.number.isRequired // Parameter of the task list mode
  };

  static defaultProps = {
    deleteTask: noSetFunction,
    editTask: noSetFunction
  };

  // Default mode for editing is 'not editing'
  state = {
    editMode: false
  };

  render() {
    const { task, taskliststyle } = this.props;

    // Determining status of the current task for change its' style
    const status = task.finished
      ? "success"
      : Date.parse(task.date) > new Date() || !task.date
        ? ""
        : "danger";

    const taskEditor = (
      <TaskEditor
        task={task}
        toggleEditMode={this.toggleEditMode}
        taskliststyle={taskliststyle}
      />
    );

    return (
      <span {...(taskliststyle ? { className: "taskItem" } : null)}>
        {this.state.editMode ? (
          taskliststyle ? (
            <Modal.Dialog>
              <Modal.Body>{taskEditor}</Modal.Body>
            </Modal.Dialog>
          ) : (
            taskEditor
          )
        ) : (
          <Panel {...(status ? { bsStyle: status } : {})}>
            <TaskHeader task={task} toggleEditMode={this.toggleEditMode} />
            <TaskBody task={task} taskliststyle={taskliststyle} />
          </Panel>
        )}
      </span>
    );
  }

  toggleEditMode = () => {
    this.setState({
      editMode: !this.state.editMode
    });
  };
}

export default Task;
