import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Task from "./Task";

class TasksList extends React.Component {
  static propTypes = {
    tasks: PropTypes.array,
    displayMode: PropTypes.number,
    filterKey: PropTypes.number
  };

  static defaultProps = {
    tasks: []
  };

  render() {
    const { tasks, filterKey, displayMode } = this.props;

    const body = tasks
      .filter(task => filterKey < 0 || +task.importance === filterKey)
      .filter(
        task =>
          displayMode < 0 || Boolean(task.finished) === Boolean(displayMode)
      )
      .map(task => <Task task={task} key={task.id} />);
    return <div className="tasks-list">{body}</div>;
  }
}

export default connect(state => {
  return {
    tasks: state.taskslist
  };
})(TasksList);
