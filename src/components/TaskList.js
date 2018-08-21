import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Col } from "react-bootstrap";

import Task from "./Task";

import { saveToServer } from "../helpers/workWithServer";

import XOR from "../helpers/XOR";
import { taskType } from "../types";

TasksList.propTypes = {
  tasks: PropTypes.arrayOf(taskType.isRequired).isRequired, // Object of the task
  displayMode: PropTypes.number.isRequired, // Number of the filter parameter
  filterKey: PropTypes.number.isRequired, // Number of the filter parameter
  sorterMode: PropTypes.number.isRequired, // Number of the sort parameter
  userName: PropTypes.string.isRequired, // Name of the user
  taskliststyle: PropTypes.number.isRequired // Parameter of the task list mode
};

function TasksList(props) {
  const { tasks, filterKey, displayMode, sorterMode, userName } = props;

  saveToServer(
    {
      email: userName,
      tasks: tasks
    },
    "tasks"
  );

  const { taskliststyle } = props;

  const body = tasks
    // Filtering tasks by importance
    .filter(task => filterKey < 0 || +task.importance === filterKey)
    // Filtering tasks by complete
    .filter(task => displayMode < 0 || !XOR(task.finished, displayMode))
    // Sort
    .sort((firstTask, secondTask) => {
      switch (sorterMode) {
        case -1:
          return 0;
        case 1:
          if (firstTask.title.toLowerCase() > secondTask.title.toLowerCase())
            return 1;
          else return -1;
        case 2:
          return firstTask.date && secondTask.date
            ? Math.sign(
                Date.parse(firstTask.date) - Date.parse(secondTask.date)
              )
            : firstTask.date
              ? -1
              : 1;
        case 3:
          return Math.sign(secondTask.importance - firstTask.importance);
        case 4:
          return Math.sign(firstTask.importance - secondTask.importance);
        default:
          return 0;
      }
    })
    // Create component for each task
    .map(task => (
      <Col xs={12} {...(taskliststyle ? { sm: 6, md: 3 } : null)} key={task.id}>
        <Task task={task} taskliststyle={taskliststyle} />
      </Col>
    ));

  return <div className="tasks-list">{body}</div>;
}

export default connect(state => {
  return {
    tasks: state.taskslist
  };
})(TasksList);
