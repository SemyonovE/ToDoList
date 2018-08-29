import React from "react";
import { func, number } from "prop-types";
import { connect } from "react-redux";
import { changeTasklistStyle } from "../actionCreator";

import { MenuItem } from "react-bootstrap";

import { Consumer } from "../context";

const TaskListStyle = ({ tasklistStyle, changeTasklistStyle: change }) => (
  <Consumer>
    {({ LANG: { toggleTaskListStyleToggle } }) => (
      <MenuItem
        eventKey="tasklist-style"
        onClick={() => change(tasklistStyle === 0 ? 1 : 0)}
      >
        {toggleTaskListStyleToggle}
      </MenuItem>
    )}
  </Consumer>
);

TaskListStyle.propTypes = {
  changeTasklistStyle: func.isRequired, // Function for the toggle task list mode
  tasklistStyle: number.isRequired // The parameter of the tasklist style
};

const WithConnect = connect(
  ({ setting: { tasklistStyle } }) => ({ tasklistStyle }),
  { changeTasklistStyle }
)(TaskListStyle);

export { WithConnect as TaskListStyle };
