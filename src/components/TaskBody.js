import React from "react";
import { number } from "prop-types";
import { connect } from "react-redux";

import { Grid, Row, Col, Panel } from "react-bootstrap";

import { taskType } from "../types";
import { Consumer } from "../context";

import moment from "moment";

import { fullFormat } from "../helpers/datetimeFormat";

// The component receive the task and display its
const TaskBody = ({ tasklistStyle, task }) => (
  <Panel.Body>
    <Grid>
      <Consumer>
        {({ LANG: { from, to, withoutDate } }) => (
          <Row {...(tasklistStyle ? { className: "center-and-bold" } : null)}>
            <Col xs={12} sm={tasklistStyle ? 12 : 2}>
              <span className="task-title">{task.title}</span>
            </Col>
            <Col xs={12} sm={tasklistStyle ? 12 : 6}>
              <span className="task-text">{task.text}</span>
            </Col>
            <Col xs={12} sm={tasklistStyle ? 12 : 2}>
              <span className="task-date">
                {from +
                  ": " +
                  (task.date
                    ? moment(task.date).format(fullFormat)
                    : withoutDate)}
              </span>
            </Col>
            <Col xs={12} sm={tasklistStyle ? 12 : 2}>
              <span className="task-finished">
                {task.finished
                  ? to + ": " + moment(task.finished).format(fullFormat)
                  : ""}
              </span>
            </Col>
          </Row>
        )}
      </Consumer>
    </Grid>
  </Panel.Body>
);

TaskBody.propTypes = {
  task: taskType.isRequired, // Object of the task
  tasklistStyle: number.isRequired // Parameter of the task list mode
};

export default connect(({ setting: { tasklistStyle } }) => ({ tasklistStyle }))(
  TaskBody
);
