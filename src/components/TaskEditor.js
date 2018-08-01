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

import "../../node_modules/react-datetime/css/react-datetime.css";

import FormTaskData from "./FormTaskData";

class TaskEditor extends React.Component {
  static propTypes = {
    task: PropTypes.object,
    toggleEditMode: PropTypes.func
  };

  state = {
    task: { ...this.props.task }
  };

  render() {
    const { task } = this.state;

    return (
      <Panel>
        <Panel.Heading className="clear">
          <span className="right">
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id={task.id + "ok"}>Set changes</Tooltip>}
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
                <Tooltip id={task.id + "cancel"}>Cansel changes</Tooltip>
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
        />
      </Panel>
    );
  }

  editCurrentTask = () => {
    const { editTask } = this.props;
    editTask(this.state.task);
    this.props.toggleEditMode();
  };
}

export default connect(
  null,
  { editTask }
)(TaskEditor);