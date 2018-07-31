import React, { Component } from 'react';
import PropTypes from 'prop-types'

import Task from '../Task'

import "./style.css"

class TasksList extends Component {
  static propTypes = {
    taskList: PropTypes.object
  }

  static defaultProps = {
    taskList: {
      categories: [],
      tasks: []
    }
  }

  render() {
    const {tasks} = this.props.tasklist
    const body = tasks.map(task => (
        <Task task={task} key={task.id} />
      )
    )

    return (
      <ul className="tasks-list">
        {body}
      </ul>
    );
  }
}

export default TasksList;