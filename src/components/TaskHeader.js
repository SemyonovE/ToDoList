import React from "react";
import { func } from "prop-types";
import { connect } from "react-redux";
import { deleteTask, editTask } from "../actionCreator";

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

import ButtonWithTrigger from "./ButtonWithTrigger";

import { fullFormat } from "../helpers/datetimeFormat";
import { taskType } from "../types";
import { Consumer } from "../context";

// The component receive the task and display its
class TaskHeader extends React.Component {
  render = ({ task, deleteTask, editTask } = this.props) => {
    // Count of fires
    const importance = "!"
      .repeat(+task.importance)
      .split("")
      .map((_, index) => <Glyphicon key={index} glyph="fire" />);

    const date = moment(task.date, fullFormat) || moment();
    const daysLeft =
      date >= moment() ? Math.ceil((date - moment()) / 864e5) : null;

    return (
      <Panel.Heading>
        <Grid className="clear">
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
                <Col xs={4} className="without-paddings">
                  <OverlayTrigger
                    placement="bottom"
                    overlay={
                      <Tooltip id={task.id + "importance"}>
                        {importanceTooltip}
                      </Tooltip>
                    }
                  >
                    <span className="task-importance left">{importance}</span>
                  </OverlayTrigger>
                </Col>
                <Col xs={2} className="without-paddings">
                  <OverlayTrigger
                    placement="bottom"
                    overlay={
                      <Tooltip id={task.id + "daysLeft"}>
                        {daysLeftTooltip}
                      </Tooltip>
                    }
                  >
                    <span className="left days-left">
                      {daysLeft && !task.finished
                        ? daysLeft === 1
                          ? "<1"
                          : daysLeft - 1
                        : null}
                    </span>
                  </OverlayTrigger>
                </Col>
                <Col xs={6} className="without-paddings">
                  <span className="right">
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
                  </span>
                </Col>
              </Row>
            )}
          </Consumer>
        </Grid>
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

export default connect(
  null,
  { deleteTask, editTask }
)(TaskHeader);
