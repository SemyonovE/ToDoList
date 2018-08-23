import React from "react";
import { func, number } from "prop-types";
import { connect } from "react-redux";
import { changeTasklistStyle } from "../actionCreator";

import ButtonWithTrigger from "./ButtonWithTrigger";

import { Consumer } from "../context";

const TaskListStyle = ({ tasklistStyle, changeTasklistStyle: change }) => (
  <div className="task-list-style">
    <Consumer>
      {({ LANG: { toggleTaskListStyleToggle } }) => (
        <ButtonWithTrigger
          iconType={tasklistStyle ? "align-justify" : "th"}
          tooltipText={toggleTaskListStyleToggle}
          activateFunction={() => change(tasklistStyle === 0 ? 1 : 0)}
        />
      )}
    </Consumer>
  </div>
);

TaskListStyle.propTypes = {
  changeTasklistStyle: func.isRequired, // Function for the toggle task list mode
  tasklistStyle: number.isRequired // The parameter of the tasklist style
};

export default connect(
  ({ setting: { tasklistStyle } }) => ({ tasklistStyle }),
  { changeTasklistStyle }
)(TaskListStyle);
