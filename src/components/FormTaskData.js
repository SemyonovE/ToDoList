import React from "react";
import { func } from "prop-types";
import { connect } from "react-redux";

import Datetime from "react-datetime";
import {
  Panel,
  Grid,
  Row,
  Col,
  ControlLabel,
  FormGroup
} from "react-bootstrap";

import moment from "moment";

import SelectForm from "./SelectForm";

import { taskType } from "../types";
import { Consumer } from "../context";
import FormGroupWithInput from "./FormGroupWithInput";
import { dateFormat, timeFormat, fullFormat } from "../helpers/datetimeFormat";

// The component send created task to reducer for addition the task to list
const FormTaskData = ({
  task,
  tasklistStyle,
  reverseFlowFunction: f,
  withTasklistStyle
}) => (
  <Panel.Body>
    <Grid>
      <Row>
        <Consumer>
          {({ LANG: { titles, importances } }) => (
            <form>
              <FormGroupWithInput
                sm={tasklistStyle && withTasklistStyle ? 12 : 2}
                title={titles.title}
                taskTitle={task.title}
                reverseFunc={ev => f({ title: ev.target.value })}
              />
              <FormGroupWithInput
                sm={tasklistStyle && withTasklistStyle ? 12 : 6}
                title={titles.text}
                taskTitle={task.text}
                reverseFunc={ev => f({ text: ev.target.value })}
              />
              <Col xs={12} sm={tasklistStyle && withTasklistStyle ? 6 : 2}>
                <FormGroup>
                  <ControlLabel>{titles.date}</ControlLabel>
                  <Datetime
                    value={task.date && moment(task.date).format(fullFormat)}
                    dateFormat={dateFormat}
                    timeFormat={timeFormat}
                    onChange={moment =>
                      f({
                        date:
                          typeof moment === "object"
                            ? moment.isValid()
                              ? String(moment.toISOString())
                              : ""
                            : ""
                      })
                    }
                  />
                </FormGroup>
              </Col>
              <Col xs={12} sm={tasklistStyle && withTasklistStyle ? 6 : 2}>
                <SelectForm
                  title={titles.importance}
                  changeFunction={value => f({ importance: String(value) })}
                  currentValue={+task.importance}
                  options={[
                    { value: 0, title: importances[1] },
                    { value: 1, title: importances[2] },
                    { value: 3, title: importances[3] }
                  ]}
                />
              </Col>
            </form>
          )}
        </Consumer>
      </Row>
    </Grid>
  </Panel.Body>
);

FormTaskData.propTypes = {
  task: taskType.isRequired, // Object of the task
  reverseFlowFunction: func.isRequired // Function for reverse data flow for some changes in the parent's node
};

export default connect(({ setting: { tasklistStyle } }) => ({ tasklistStyle }))(
  FormTaskData
);
