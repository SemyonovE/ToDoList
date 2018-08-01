import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addTask } from "../../actionCreator";

import hashCode from '../../hashCode'

//Empty task for initialization of the state of the component
const initTask = () => ({
  id: "",
  title: "",
  text: "",
  importance: "",
  date: "",
  category: "",
  finished: ""
});

//The component send created task to reducer for addition the task to list
class CreateTask extends React.Component {
  static propTypes = {
    addTask: PropTypes.func
  };

  state = {
    task: initTask()
  };

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="title"
          value={this.state.task.title}
          onChange={ev => this.changeFieldOfTask(ev, "title")}
        />
        <input
          type="text"
          placeholder="text"
          value={this.state.task.text}
          onChange={ev => this.changeFieldOfTask(ev, "text")}
        />
        <input
          type="date"
          placeholder="date"
          value={this.state.task.date}
          onChange={ev => this.changeFieldOfTask(ev, "date")}
        />
        <select
          value={this.state.task.importance}
          onChange={ev => this.changeFieldOfTask(ev, "importance")}
        >
          <option value="" disabled>
            importance
          </option>
          <option value="0">normal</option>
          <option value="1">important</option>
          <option value="3">very important</option>
        </select>
        <button onClick={this.addTaskToList}>add</button>
      </div>
    );
  }

  addTaskToList = () => {
    const { addTask } = this.props;
    const {task} = this.state

    //Validation of fields of the task
    if(!this.validation(task)) return

    //Change store by add the task
    addTask(task);

    //Clear the task and fields of creating form
    this.setState({
      task: initTask()
    });
  };

  changeFieldOfTask = (ev, field) => {
    //Change field 'field' of the current task
    const task = { ...this.state.task };
    task[field] = ev.target.value;

    if(field === 'title') {
      task.id = hashCode(task.title)
    }

    this.setState({
      task: task
    });
  };

  validation = (task) => {
    if(task.title === "") {
      alert('The title of your new task is empty!')
      return false
    }
    if(task.text === "") {
      alert('The text of your new task is empty!')
      return false
    }
    if(task.importance === "") {
      alert("You don't select importance of current task!")
      return false
    }

    return true
  }
}

export default connect(
  null,
  { addTask }
)(CreateTask);
