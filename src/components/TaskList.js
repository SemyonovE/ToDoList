import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Task from "./Task";

import XOR from "../helpers/XOR";
import { taskType } from "../types";

TasksList.propTypes = {
  tasks: PropTypes.arrayOf(taskType.isRequired).isRequired, // Object of the task
  displayMode: PropTypes.number.isRequired, // Number of the filter parameter
  filterKey: PropTypes.number.isRequired, // Number of the filter parameter
  sorterMode: PropTypes.number.isRequired // Number of the sort parameter
};

function TasksList(props) {
  const { tasks, filterKey, displayMode, sorterMode } = props;

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
          return Math.sign(
            Date.parse(firstTask.date) - Date.parse(secondTask.date)
          );
        case 3:
          return Math.sign(secondTask.importance - firstTask.importance);
        case 4:
          return Math.sign(firstTask.importance - secondTask.importance);
        default:
          return 0;
      }
    })
    // Create component for each task
    .map(task => <Task task={task} key={task.id} />);

  return <div className="tasks-list">{body}</div>;
}

export default connect(state => {
  return {
    tasks: state.taskslist
  };
})(TasksList);
