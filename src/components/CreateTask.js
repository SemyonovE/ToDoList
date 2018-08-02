import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addTask } from "../actionCreator";

import {
  Button,
  Glyphicon,
  Panel,
  OverlayTrigger,
  Tooltip
} from "react-bootstrap";

import FormTaskData from "./FormTaskData";
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
    addTask: PropTypes.func
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
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id={task.id + "add"}>Add the new task</Tooltip>}
            >
              <Button
                bsStyle="primary"
                bsSize="xsmall"
                onClick={this.addTaskToList}
              >
                <Glyphicon glyph="plus" />
              </Button>
            </OverlayTrigger>
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
      alert("The title of your new task is empty!");
      return;
    }
    if (task.text === "") {
      alert("The text of your new task is empty!");
      return;
    }
    if (task.importance === "") {
      alert("You don't select importance of current task!");
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

export default tabDecorator(connect(
  null,
  { addTask }
)(CreateTask));
