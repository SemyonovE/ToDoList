import React from "react";
import { func, number } from "prop-types";
import { connect } from "react-redux";
import { changeTasklistStyle } from "../actionCreator";
import styled from "styled-components";

import { Consumer } from "../context";
import ButtonWithTrigger from "./ButtonWithTrigger";

const TaskLstStyleStyled = styled.div`
  z-index: 1000;
  position: fixed;
  top: 10px;
  right: 10px;
`;

const TaskListStyle = ({ tasklistStyle, changeTasklistStyle: change }) => (
  <TaskLstStyleStyled>
    <Consumer>
      {({ LANG: { toggleTaskListStyleToggle } }) => (
        <ButtonWithTrigger
          iconType={tasklistStyle ? "align-justify" : "th"}
          tooltipText={toggleTaskListStyleToggle}
          activateFunction={() => change(tasklistStyle === 0 ? 1 : 0)}
        />
      )}
    </Consumer>
  </TaskLstStyleStyled>
);

TaskListStyle.propTypes = {
  changeTasklistStyle: func.isRequired, // Function for the toggle task list mode
  tasklistStyle: number.isRequired // The parameter of the tasklist style
};

export default connect(
  ({ setting: { tasklistStyle } }) => ({ tasklistStyle }),
  { changeTasklistStyle }
)(TaskListStyle);
