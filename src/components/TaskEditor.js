import React from "react";
import { func } from "prop-types";
import { connect } from "react-redux";
import { editTask } from "../actionCreator";

import { Panel } from "react-bootstrap";

import { FormTaskData, ButtonWithTrigger } from "./";

import { Consumer } from "../context";
import { taskType } from "../types";
import { SpanRight, ClearStyle } from "../styles";
import styled from "styled-components";

const ClearBoth = styled(Panel.Heading)`
  ${ClearStyle};
`;

class TaskEditor extends React.Component {
  state = {
    ...this.props.task
  };

  render = (task = this.state) => (
    <Panel>
      <ClearBoth>
        <Consumer>
          {({
            LANG: { setChangesTooltip, cancelChangesTooltip, emptyTitle }
          }) => (
            <SpanRight>
              <ButtonWithTrigger
                iconType="ok-circle"
                tooltipText={setChangesTooltip}
                activateFunction={() => this.editCurrentTask(emptyTitle)}
                buttonStyle="success"
              />
              <ButtonWithTrigger
                iconType="remove-circle"
                tooltipText={cancelChangesTooltip}
                activateFunction={this.props.toggleEditMode}
                buttonStyle="danger"
              />
            </SpanRight>
          )}
        </Consumer>
      </ClearBoth>
      <FormTaskData
        task={task}
        withTasklistStyle
        reverseFlowFunction={obj => this.setState(obj)}
      />
    </Panel>
  );

  editCurrentTask = (emptyTitle, { editTask, toggleEditMode } = this.props) => {
    //Validation of fields of the task
    if (!this.state.title.trim().length) {
      alert(emptyTitle + "!");
      return;
    }

    editTask(this.state);

    toggleEditMode();
  };
}

TaskEditor.propTypes = {
  task: taskType.isRequired, // Object of the task
  toggleEditMode: func.isRequired, // Function for toggle of edit mode
  editTask: func.isRequired // Function for edit the task
};

const WithConnect = connect(
  null,
  { editTask }
)(TaskEditor);

export { WithConnect as TaskEditor };
