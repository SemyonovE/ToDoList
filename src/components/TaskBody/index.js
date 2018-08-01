import React from "react";
import PropTypes from "prop-types";

import { Grid, Row, Col, Panel } from "react-bootstrap";

import "./style.css";

//The component receive the task and display its
class TaskBody extends React.Component {
  static propTypes = {
    task: PropTypes.object
  };

  state = {
    editMode: false
  };

  render() {
    const { task } = this.props;

    return (
      <Panel.Body>
        <Grid>
          <Row>
            <Col xs={12} sm={2}>
              <span className="task-title">{task.title}</span>
            </Col>
            <Col xs={12} sm={6}>
              <span className="task-text">{task.text}</span>
            </Col>
            <Col xs={6} sm={2}>
              <span className="task-date">{"from: " + (task.date ? task.date : "date don't set")}</span>
            </Col>
            <Col xs={6} sm={2}>
              <span className="task-finished">
                {task.finished ? "to: " + task.finished : ""}
              </span>
            </Col>
          </Row>
        </Grid>
      </Panel.Body>
    );
  }
}

export default TaskBody;
