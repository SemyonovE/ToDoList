import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import ButtonWithTrigger from "./ButtonWithTrigger";

class TaskListStyle extends React.Component {
  static propTypes = {
    taskliststyle: PropTypes.number.isRequired, // Paramenet of the task list mode
    toggleStyleListStyle: PropTypes.func, // Function for the toggle task list mode
    toggleTaskListStyleToggle: PropTypes.string.isRequired // Tooltip
  };

  render() {
    const { taskliststyle, toggleTaskListStyleToggle } = this.props;

    return (
      <div className="task-list-style">
        <ButtonWithTrigger
          iconType={taskliststyle ? "align-justify" : "th"}
          tooltipText={toggleTaskListStyleToggle}
          activateFunction={this.props.toggleStyleListStyle}
          buttonStyle="primary"
        />
      </div>
    );
  }
}

export default connect(state => {
  return {
    toggleTaskListStyleToggle: state.language.toggleTaskListStyleToggle
  };
})(TaskListStyle);
