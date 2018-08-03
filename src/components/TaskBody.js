import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Grid, Row, Col, Panel } from "react-bootstrap";

import { taskType } from "../types";

TaskBody.propTypes = {
  task: taskType.isRequired, // Object of the task
  from: PropTypes.string, // Text for date
  to: PropTypes.string, // Text for date of complete
  withoutDate: PropTypes.string // Text when date wasn't set
};

TaskBody.defaultProps = {
  from: "from",
  to: "to",
  withoutDate: "date don't set"
};

// The component receive the task and display its
function TaskBody(props) {
  const { task, from, to, withoutDate } = props;

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
            <span className="task-date">
              {from + ": " + (task.date ? task.date : withoutDate)}
            </span>
          </Col>
          <Col xs={6} sm={2}>
            <span className="task-finished">
              {task.finished ? to + ": " + task.finished : ""}
            </span>
          </Col>
        </Row>
      </Grid>
    </Panel.Body>
  );
}

export default connect(state => {
  return {
    from: state.language.from,
    to: state.language.to,
    withoutDate: state.language.withoutDate
  };
})(TaskBody);
