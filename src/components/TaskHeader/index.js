import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteTask, editTask } from "../../actionCreator";

import { Button, Glyphicon, Grid, Row, Col, Panel } from "react-bootstrap";

import './style.css'

const monthNamesShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

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
  }

  render() {
    const { task } = this.props;

    const importance = +task.importance * (task.finished.length === 0);

    return (
        <Panel.Heading>
          <Grid className="clear">
            <Row>
              <Col xs={6} className="withoutpaddings">
                <span className="task-importance left">
                  {importance > 0 ? <Glyphicon glyph="fire" /> : null}
                  {importance > 1 ? (
                    <span>
                      <Glyphicon glyph="fire" />
                      <Glyphicon glyph="fire" />
                    </span>
                  ) : null}
                </span>
              </Col>
              <Col xs={6} className="withoutpaddings">
                <span className="right">
                  <Button
                    bsStyle="success"
                    bsSize="xsmall"
                    {...(task.finished ? { disabled: true } : {})}
                    onClick={this.finishedCurrentTask}
                  >
                    <Glyphicon glyph="check" />
                  </Button>
                  <Button
                    bsStyle="primary"
                    bsSize="xsmall"
                    onClick={this.props.toggleEditMode}
                    {...(task.finished ? { disabled: true } : {})}
                  >
                    <Glyphicon glyph="edit" />
                  </Button>
                  <Button
                    bsStyle="danger"
                    bsSize="xsmall"
                    onClick={this.deleteTask}
                  >
                    <Glyphicon glyph="remove" />
                  </Button>
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
      date.getDate() +
      " " +
      monthNamesShort[date.getMonth()] +
      " " +
      date.getFullYear() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes();
    editTask(temptask);
  };
}

export default connect(
  null,
  { deleteTask, editTask }
)(TaskHeader);
