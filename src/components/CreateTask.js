import React from "react";
import { func } from "prop-types";
import { connect } from "react-redux";
import { addTask } from "../actionCreator";
import { Consumer } from "../context";

import { Panel } from "react-bootstrap";

import FormTaskData from "./FormTaskData";
import ButtonWithTrigger from "./ButtonWithTrigger";
import tabDecorator from "../decorators/tabDecorator";

import hashCode from "../helpers/hashCode";
import { initTask } from "../helpers/initialParameters";
import { SpanRight, ClearStyle } from "../styles";
import styled from "styled-components";

const ClearBoth = styled(Panel.Heading)`
  ${ClearStyle};
`;

// The component send created task to reducer for addition the task to list
class CreateTask extends React.Component {
  state = initTask;

  render = () => (
    <Panel bsStyle="info">
      <ClearBoth>
        <SpanRight>
          <Consumer>
            {({ LANG: { createTaskTooltip, emptyTitle } }) => (
              <ButtonWithTrigger
                iconType="plus-sign"
                tooltipText={createTaskTooltip}
                activateFunction={() => this.addTaskToList(emptyTitle)}
              />
            )}
          </Consumer>
        </SpanRight>
      </ClearBoth>
      <FormTaskData
        task={this.state}
        reverseFlowFunction={obj => this.setState(obj)}
      />
    </Panel>
  );

  addTaskToList = (emptyTitle, task = this.state) => {
    //Validation of fields of the task
    if (!task.title.trim().length) {
      alert(emptyTitle + "!");
      return;
    }

    // Change store by add the task with generating the unique id for the new task
    this.props.addTask({
      ...task,
      id: hashCode(task.title + task.text + task.date + task.importance)
    });

    // Clear the task and fields of creating form
    this.setState(initTask);
  };
}

CreateTask.propTypes = {
  addTask: func.isRequired // Function for creating a new task
};

export default tabDecorator(
  // Decorator for make this form for tab
  connect(
    null,
    { addTask }
  )(CreateTask)
);
