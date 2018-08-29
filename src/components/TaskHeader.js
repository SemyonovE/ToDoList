import React from "react";
import { func } from "prop-types";
import { connect } from "react-redux";
import { deleteTask, editTask } from "../actionCreator";
import styled from "styled-components";

import {
  Glyphicon,
  Grid,
  Row,
  Col,
  Panel,
  OverlayTrigger,
  Tooltip
} from "react-bootstrap";
import moment from "moment";

import { ButtonWithTrigger } from "./";

import { taskType } from "../types";
import { Consumer } from "../context";
import { SpanRight, ClearStyle } from "../styles";

const DaysLeft = styled.span`
  font-weight: bold;
`;

const ImportanceSpan = styled.span`
  font-weight: bold;
  color: red;
`;

const ClearBoth = styled(Grid)`
  ${ClearStyle};
`;

const ColWithoutPaddings = styled(Col)`
  padding: 0;
`;

// The component receive the task and display its
class TaskHeader extends React.Component {
  render = ({ task, deleteTask, editTask } = this.props) => {
    // Count of fires
    const importance = "!"
      .repeat(+task.importance)
      .split("")
      .map((_, index) => <Glyphicon key={index} glyph="fire" />);

    const date = moment(task.date) || moment();
    const daysLeft =
      date >= moment() ? Math.ceil((date - moment()) / 864e5) : null;

    return (
      <Panel.Heading>
        <ClearBoth>
          <Consumer>
            {({
              LANG: {
                importanceTooltip,
                editTTaskooltip,
                completeTaskTooltip,
                incompleteTaskTooltip,
                deleteTaskTooltip,
                daysLeftTooltip
              }
            }) => (
              <Row>
                <ColWithoutPaddings xs={4}>
                  <OverlayTrigger
                    placement="bottom"
                    overlay={
                      <Tooltip id={task.id + "importance"}>
                        {importanceTooltip}
                      </Tooltip>
                    }
                  >
                    <ImportanceSpan>{importance}</ImportanceSpan>
                  </OverlayTrigger>
                </ColWithoutPaddings>
                <ColWithoutPaddings xs={2}>
                  <OverlayTrigger
                    placement="bottom"
                    overlay={
                      <Tooltip id={task.id + "daysLeft"}>
                        {daysLeftTooltip}
                      </Tooltip>
                    }
                  >
                    <DaysLeft>
                      {daysLeft && !task.finished
                        ? daysLeft === 1
                          ? "<1"
                          : daysLeft - 1
                        : null}
                    </DaysLeft>
                  </OverlayTrigger>
                </ColWithoutPaddings>
                <ColWithoutPaddings xs={6}>
                  <SpanRight>
                    {!task.finished ? (
                      <span>
                        <ButtonWithTrigger
                          iconType="edit"
                          tooltipText={editTTaskooltip}
                          activateFunction={this.props.toggleEditMode}
                        />
                        <ButtonWithTrigger
                          iconType="check"
                          tooltipText={completeTaskTooltip}
                          activateFunction={() =>
                            editTask({
                              ...task,
                              ...{ finished: String(moment().toISOString()) }
                            })
                          }
                          buttonStyle="success"
                        />
                      </span>
                    ) : (
                      <ButtonWithTrigger
                        iconType="unchecked"
                        tooltipText={incompleteTaskTooltip}
                        activateFunction={() =>
                          editTask({ ...task, ...{ finished: "" } })
                        }
                        buttonStyle="success"
                      />
                    )}
                    <ButtonWithTrigger
                      iconType="remove"
                      tooltipText={deleteTaskTooltip}
                      activateFunction={() => deleteTask(task.id)}
                      buttonStyle="danger"
                    />
                  </SpanRight>
                </ColWithoutPaddings>
              </Row>
            )}
          </Consumer>
        </ClearBoth>
      </Panel.Heading>
    );
  };
}

TaskHeader.propTypes = {
  task: taskType.isRequired, // Object of the task
  toggleEditMode: func.isRequired, // Function for toggle of edit mode
  deleteTask: func.isRequired, // Finction for delete of the task
  editTask: func.isRequired // Function for edit of the task
};

const WithConnect = connect(
  null,
  { deleteTask, editTask }
)(TaskHeader);

export { WithConnect as TaskHeader };
