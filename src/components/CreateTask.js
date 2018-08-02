import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addTask } from "../actionCreator";

import { Panel } from "react-bootstrap";

import FormTaskData from "./FormTaskData";
import ButtonWithTrigger from "./ButtonWithTrigger";
import tabDecorator from "../decorators/tabDecorator";

import hashCode from "../helpers/hashCode";

import "../../node_modules/react-datetime/css/react-datetime.css";

//Empty task for initialization of the state of the component
const initTask = () => ({
  id: "",
  title: "",
  text: "",
  importance: "0",
  date: "",
  finished: ""
});

//The component send created task to reducer for addition the task to list
class CreateTask extends React.Component {
  static propTypes = {
    addTask: PropTypes.func,
    createTaskTooltip: PropTypes.string,
    emptyTitle: PropTypes.string,
    emptyText: PropTypes.string
  };

  state = {
    task: initTask()
  };

  render() {
    const { task } = this.state;

    return (
      <Panel bsStyle="info">
        <Panel.Heading className="clear">
          <span className="right">
            <ButtonWithTrigger
              id={task.id}
              iconType="plus"
              tooltipText={this.props.createTaskTooltip}
              activateFunction={this.addTaskToList}
              buttonStyle="primary"
            />
          </span>
        </Panel.Heading>
        <FormTaskData
          task={task}
          reverseFlowFunction={task => this.setState({ task: task })}
        />
      </Panel>
    );
  }

  addTaskToList = () => {
    const { addTask } = this.props;
    const task = { ...this.state.task };

    //Validation of fields of the task
    if (task.title === "") {
      alert(this.props.emptyTitle + "!");
      return;
    }
    if (task.text === "") {
      alert(this.props.emptyText + "!");
      return;
    }

    task.id = hashCode(task.title + task.text + task.date);

    //Change store by add the task
    addTask(task);

    //Clear the task and fields of creating form
    this.setState({
      task: initTask()
    });
  };
}

export default tabDecorator(
  connect(
    state => {
      return {
        createTaskTooltip: state.language.createTaskTooltip,
        emptyTitle: state.language.emptyTitle,
        emptyText: state.language.emptyText
      };
    },
    { addTask }
  )(CreateTask)
);
