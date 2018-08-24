import React from "react";
import { number } from "prop-types";
import { connect } from "react-redux";
import styled, { css } from "styled-components";

import { Panel, Modal } from "react-bootstrap";

import moment from "moment";

import TaskHeader from "./TaskHeader";
import TaskBody from "./TaskBody";
import TaskEditor from "./TaskEditor";

import { taskType } from "../types";

const TaskStyle = css`
  .panel-body {
    height: 200px;
    overflow: scroll;
  }
  .modal-body .panel-body {
    height: auto;
    overflow: visible;
  }

  .panel-body div:not(:last-child) {
    padding-bottom: 5px;
  }
`;

const SpanStyled = styled.span`
  ${({ tasklistStyle }) => (tasklistStyle ? TaskStyle : null)};
`;

// The component receive the task and display its
class Task extends React.Component {
  // Default mode for editing is 'not editing'
  state = {
    editMode: false
  };

  render = ({ task, tasklistStyle } = this.props) => {
    // Determining status of the current task for change its' style
    const status = task.finished
      ? "success"
      : moment(task.date) > moment() || !task.date
        ? ""
        : "danger";

    const taskEditor = (
      <TaskEditor task={task} toggleEditMode={this.toggleEditMode} />
    );

    return (
      <SpanStyled {...{ tasklistStyle }}>
        {this.state.editMode ? (
          tasklistStyle ? (
            <Modal.Dialog>
              <Modal.Body>{taskEditor}</Modal.Body>
            </Modal.Dialog>
          ) : (
            taskEditor
          )
        ) : (
          <Panel {...(status ? { bsStyle: status } : {})}>
            <TaskHeader task={task} toggleEditMode={this.toggleEditMode} />
            <TaskBody task={task} />
          </Panel>
        )}
      </SpanStyled>
    );
  };

  toggleEditMode = () => {
    this.setState(pS => ({
      editMode: !pS.editMode
    }));
  };
}

Task.propTypes = {
  task: taskType.isRequired, // Object of the task
  tasklistStyle: number.isRequired // Parameter of the task list mode
};

export default connect(({ setting: { tasklistStyle } }) => ({ tasklistStyle }))(
  Task
);
