import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteTask, editTask } from "../actionCreator";

import {
  Button,
  Glyphicon,
  Grid,
  Row,
  Col,
  Panel,
  OverlayTrigger,
  Tooltip
} from "react-bootstrap";

const monthNamesShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

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

    const importance = +task.importance * (task.finished === "");

    return (
      <Panel.Heading>
        <Grid className="clear">
          <Row>
            <Col xs={6} className="withoutpaddings">
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip id={task.id + "importance"}>
                    Importance of the task
                  </Tooltip>
                }
              >
                <span className="task-importance left">
                  {importance > 0 ? <Glyphicon glyph="fire" /> : null}
                  {importance > 1 ? (
                    <span>
                      <Glyphicon glyph="fire" />
                      <Glyphicon glyph="fire" />
                    </span>
                  ) : null}
                </span>
              </OverlayTrigger>
            </Col>
            <Col xs={6} className="withoutpaddings">
              <span className="right">
                {!task.finished ? (
                  <span>
                    <OverlayTrigger
                      placement="bottom"
                      overlay={
                        <Tooltip id={task.id + "edit"}>Edit the task</Tooltip>
                      }
                    >
                      <Button
                        bsStyle="primary"
                        bsSize="xsmall"
                        onClick={this.props.toggleEditMode}
                      >
                        <Glyphicon glyph="edit" />
                      </Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="bottom"
                      overlay={
                        <Tooltip id={task.id + "complete"}>
                          Toggle the task as complete
                        </Tooltip>
                      }
                    >
                      <Button
                        bsStyle="success"
                        bsSize="xsmall"
                        onClick={this.finishedCurrentTask}
                      >
                        <Glyphicon glyph="check" />
                      </Button>
                    </OverlayTrigger>
                  </span>
                ) : (
                  <OverlayTrigger
                    placement="bottom"
                    overlay={
                      <Tooltip id={task.id + "return"}>
                        Return the task as incomplete
                      </Tooltip>
                    }
                  >
                    <Button
                      bsStyle="success"
                      bsSize="xsmall"
                      onClick={() => {
                        const { task, editTask } = this.props;
                        let temptask = { ...task };
                        temptask.finished = "";
                        editTask(temptask);
                      }}
                    >
                      <Glyphicon glyph="unchecked" />
                    </Button>
                  </OverlayTrigger>
                )}
                <OverlayTrigger
                  placement="bottom"
                  overlay={
                    <Tooltip id={task.id + "delete"}>Delete the task</Tooltip>
                  }
                >
                  <Button
                    bsStyle="danger"
                    bsSize="xsmall"
                    onClick={this.deleteTask}
                  >
                    <Glyphicon glyph="remove" />
                  </Button>
                </OverlayTrigger>
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

  finishedCurrentTask = () => {
    const { task, editTask } = this.props;
    let temptask = { ...task };
    const date = new Date();
    temptask.finished =
      this.addZero(date.getDate()) +
      date.getDate() +
      " " +
      monthNamesShort[date.getMonth()] +
      " " +
      date.getFullYear() +
      " " +
      this.addZero(date.getHours()) +
      date.getHours() +
      ":" +
      this.addZero(date.getMinutes()) +
      date.getMinutes();
    editTask(temptask);
  };

  addZero = value => (value < 10 ? "0" : "");
}

export default connect(
  null,
  { deleteTask, editTask }
)(TaskHeader);
