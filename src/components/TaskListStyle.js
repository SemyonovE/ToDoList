import React from "react";
import PropTypes from "prop-types";

import ButtonWithTrigger from "./ButtonWithTrigger";

class TaskListStyle extends React.Component {
  static propTypes = {
    taskliststyle: PropTypes.number.isRequired, // Paramenet of the task list mode
    toggleStyleListStyle: PropTypes.func // Function for the toggle task list mode
  };

  render() {
    const { taskliststyle } = this.props;

    return (
      <div className="task-list-style">
        <ButtonWithTrigger
          iconType={taskliststyle ? "align-justify" : "th"}
          tooltipText={"change list mode"}
          activateFunction={this.props.toggleStyleListStyle}
          buttonStyle="primary"
        />
      </div>
    );
  }
}

export default TaskListStyle;
