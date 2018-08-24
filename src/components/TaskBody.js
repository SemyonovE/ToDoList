import React from "react";
import { number } from "prop-types";
import { connect } from "react-redux";
import styled, { css } from "styled-components";

import { Grid, Row, Col, Panel } from "react-bootstrap";

import { taskType } from "../types";
import { Consumer } from "../context";

import moment from "moment";

import { fullFormat } from "../helpers/datetimeFormat";

const Style4Task = css`
  display: inline-block;
  width: 100%;
  text-align: center;
  font-weight: bold;
`;

const ModSpan4Task = styled.span``;

const RowStyled = styled(Row)`
  ${ModSpan4Task} {
    ${({ styled }) => (styled ? Style4Task : null)};
  }
`;

// The component receive the task and display its
const TaskBody = ({ tasklistStyle, task }) => (
  <Panel.Body>
    <Grid>
      <Consumer>
        {({ LANG: { from, to, withoutDate } }) => (
          <RowStyled styled={tasklistStyle}>
            <Col xs={12} sm={tasklistStyle ? 12 : 2}>
              <ModSpan4Task>{task.title}</ModSpan4Task>
            </Col>
            <Col xs={12} sm={tasklistStyle ? 12 : 6}>
              <span>{task.text}</span>
            </Col>
            <Col xs={12} sm={tasklistStyle ? 12 : 2}>
              <ModSpan4Task>
                {from +
                  ": " +
                  (task.date
                    ? moment(task.date).format(fullFormat)
                    : withoutDate)}
              </ModSpan4Task>
            </Col>
            <Col xs={12} sm={tasklistStyle ? 12 : 2}>
              <ModSpan4Task>
                {task.finished
                  ? to + ": " + moment(task.finished).format(fullFormat)
                  : ""}
              </ModSpan4Task>
            </Col>
          </RowStyled>
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
