import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Task from "./Task";

import XOR from "../helpers/XOR";
import { taskType } from "../types";

TasksList.propTypes = {
  tasks: PropTypes.arrayOf(taskType.isRequired).isRequired, // Object of the task
  displayMode: PropTypes.number.isRequired, // Number of the filter parameter
  filterKey: PropTypes.number.isRequired // Number of the filter parameter
};

function TasksList(props) {
  const { tasks, filterKey, displayMode } = props;

  const body = tasks
    // Filtering tasks by importance
    .filter(task => filterKey < 0 || +task.importance === filterKey)
    // Filtering tasks by complete
    .filter(task => displayMode < 0 || !XOR(task.finished, displayMode))
    // Create component for each task
    .map(task => <Task task={task} key={task.id} />);

  return <div className="tasks-list">{body}</div>;
}

export default connect(state => {
  return {
    tasks: state.taskslist
  };
})(TasksList);
