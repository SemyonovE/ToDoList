import React from "react";
import { arrayOf, number } from "prop-types";
import { connect } from "react-redux";

import { Col } from "react-bootstrap";

import Task from "./Task";

import XOR from "../helpers/XOR";
import { taskType } from "../types";
import sorterForTasklist from "../helpers/sorterForTasklist";

const TasksList = ({
  taskslist,
  filterKey,
  displayMode,
  sorterMode,
  tasklistStyle: style
}) => (
  <div className="tasks-list">
    {/* Filtering tasks by importance | Filtering tasks by complete | Sort | Create component for each task */}
    {taskslist
      .filter(task => filterKey < 0 || +task.importance === filterKey)
      .filter(task => displayMode < 0 || !XOR(task.finished, displayMode))
      .sort((first, second) => sorterForTasklist(first, second, sorterMode))
      .map(task => (
        <Col xs={12} {...(style ? { sm: 6, md: 3 } : null)} key={task.id}>
          <Task task={task} />
        </Col>
      ))}
  </div>
);

TasksList.propTypes = {
  taskslist: arrayOf(taskType.isRequired).isRequired, // Object of the task
  displayMode: number.isRequired, // Number of the filter parameter
  filterKey: number.isRequired, // Number of the filter parameter
  sorterMode: number.isRequired, // Number of the sort parameter
  tasklistStyle: number.isRequired // Parameter of the task list mode
};

export default connect(
  ({
    taskslist,
    setting: { filterKey, sorterMode, displayMode, tasklistStyle }
  }) => ({
    taskslist,
    filterKey,
    sorterMode,
    displayMode,
    tasklistStyle
  })
)(TasksList);
