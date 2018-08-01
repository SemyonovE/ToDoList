import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Task from "../Task";

import "./style.css";

class TasksList extends React.Component {
  static propTypes = {
    tasks: PropTypes.array
  };

  static defaultProps = {
    tasks: []
  };

  render() {
    const { tasks } = this.props;

    const body = tasks.map(task => <Task task={task} key={task.id} />);

    return <div className="tasks-list">{body}</div>;
  }
}

export default connect(state => {
  return {
    tasks: state.taskslist
  };
})(TasksList);
