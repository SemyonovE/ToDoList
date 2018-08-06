import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editTask } from "../actionCreator";

import {
  Button,
  Glyphicon,
  Panel,
  OverlayTrigger,
  Tooltip
} from "react-bootstrap";

import FormTaskData from "./FormTaskData";

import { taskType } from "../types";
import noSetFunction from "../helpers/notSetFunction";

import "../../node_modules/react-datetime/css/react-datetime.css";

class TaskEditor extends React.Component {
  static propTypes = {
    task: taskType.isRequired, // Object of the task
    toggleEditMode: PropTypes.func, // Function for toggle of edit mode
    emptyTitle: PropTypes.string.isRequired, // Text of the message for user when he did forget to write the title
    setChangesTooltip: PropTypes.string.isRequired, // Text for Tooltip
    cancelChangesTooltip: PropTypes.string.isRequired, // Text for Tooplip
    taskliststyle: PropTypes.number.isRequired // Parameter of the task list mode
  };

  static defaultProps = {
    toggleEditMode: noSetFunction
  };

  state = {
    task: { ...this.props.task }
  };

  render() {
    const { task } = this.state;
    const { taskliststyle } = this.props;

    return (
      <Panel>
        <Panel.Heading className="clear">
          <span className="right">
            <OverlayTrigger
              placement="bottom"
              overlay={
                <Tooltip id={task.id + "ok"}>
                  {this.props.setChangesTooltip}
                </Tooltip>
              }
            >
              <Button
                bsStyle="success"
                bsSize="xsmall"
                onClick={this.editCurrentTask}
              >
                <Glyphicon glyph="ok-circle" />
              </Button>
            </OverlayTrigger>
            <OverlayTrigger
              placement="bottom"
              overlay={
                <Tooltip id={task.id + "cancel"}>
                  {this.props.cancelChangesTooltip}
                </Tooltip>
              }
            >
              <Button
                bsStyle="danger"
                bsSize="xsmall"
                onClick={this.props.toggleEditMode}
              >
                <Glyphicon glyph="remove-circle" />
              </Button>
            </OverlayTrigger>
          </span>
        </Panel.Heading>
        <FormTaskData
          task={task}
          reverseFlowFunction={task => this.setState({ task: task })}
          taskliststyle={taskliststyle}
        />
      </Panel>
    );
  }

  editCurrentTask = () => {
    const { editTask } = this.props;

    //Validation of fields of the task
    if (!this.state.task.title.trim().length) {
      alert(this.props.emptyTitle + "!");
      return;
    }

    editTask(this.state.task);

    this.props.toggleEditMode();
  };
}

export default connect(
  state => {
    return {
      setChangesTooltip: state.language.setChangesTooltip,
      emptyTitle: state.language.emptyTitle,
      cancelChangesTooltip: state.language.cancelChangesTooltip
    };
  },
  { editTask }
)(TaskEditor);
