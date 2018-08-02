import React from "react";
import PropTypes from "prop-types";
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
import moment from "../../node_modules/moment";

import ButtonWithTrigger from "./ButtonWithTrigger";

//The component receive the task and display its
class TaskHeader extends React.Component {
  static propTypes = {
    task: PropTypes.object,
    toggleEditMode: PropTypes.func,
    deleteTask: PropTypes.func,
    editTask: PropTypes.func
  };

  state = {
    editMode: false
  };

  render() {
    const { task } = this.props;
    const importance = "!"
      .repeat(+task.importance)
      .split("")
      .map((_, index) => <Glyphicon key={index} glyph="fire" />);

    return (
      <Panel.Heading>
        <Grid className="clear">
          <Row>
            <Col xs={6} className="without-paddings">
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip id={task.id + "importance"}>
                    Importance of the task
                  </Tooltip>
                }
              >
                <span className="task-importance left">{importance}</span>
              </OverlayTrigger>
            </Col>
            <Col xs={6} className="without-paddings">
              <span className="right">
                {!task.finished ? (
                  <span>
                    <ButtonWithTrigger
                      id={task.id}
                      iconType="edit"
                      tooltipText="Edit the task"
                      activateFunction={this.props.toggleEditMode}
                      buttonStyle="primary"
                    />
                    <ButtonWithTrigger
                      id={task.id}
                      iconType="check"
                      tooltipText="Toggle the task as complete"
                      activateFunction={this.completeCurrentTask}
                      buttonStyle="success"
                    />
                  </span>
                ) : (
                  <ButtonWithTrigger
                    id={task.id}
                    iconType="unchecked"
                    tooltipText="Return the task as incomplete"
                    activateFunction={this.incompleteCurrentTask}
                    buttonStyle="success"
                  />
                )}
                <ButtonWithTrigger
                  id={task.id}
                  iconType="remove"
                  tooltipText="Delete the task"
                  activateFunction={this.deleteTask}
                  buttonStyle="danger"
                />
              </span>
            </Col>
          </Row>
        </Grid>
      </Panel.Heading>
    );
  }

  deleteTask = () => {
    const { deleteTask, task } = this.props;
    deleteTask(task.id);
  };

  incompleteCurrentTask = () => {
    const { task, editTask } = this.props;
    let temptask = { ...task };
    temptask.finished = "";
    editTask(temptask);
  };

  completeCurrentTask = () => {
    const { task, editTask } = this.props;
    let temptask = { ...task };
    temptask.finished = moment().format("DD MMM YYYY HH:mm");
    editTask(temptask);
  };
}

export default connect(
  null,
  { deleteTask, editTask }
)(TaskHeader);
