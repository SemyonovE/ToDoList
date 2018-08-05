import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Datetime from "react-datetime";
import {
  Panel,
  Grid,
  Row,
  Col,
  FormControl,
  ControlLabel,
  FormGroup
} from "react-bootstrap";

import SelectForm from "./SelectForm";

import { taskType } from "../types";

import "../../node_modules/react-datetime/css/react-datetime.css";

// The component send created task to reducer for addition the task to list
class FormTaskData extends React.Component {
  static propTypes = {
    task: taskType.isRequired, // Object of the task
    reverseFlowFunction: PropTypes.func.isRequired, // Function for reverse data flow for some changes in the parent's node
    titleTitle: PropTypes.string, // Text for the field of title
    titleText: PropTypes.string, // Text for the field of text
    titleDate: PropTypes.string, // Text for the field of date
    titleImportance: PropTypes.string, // Text for the field of importance
    importances: PropTypes.array.isRequired, // Array of the options of select of importance
    taskliststyle: PropTypes.number // Parameter of the task list mode
  };

  static defaultProps = {
    titleTitle: "Title",
    titleText: "Text",
    titleDate: "Date",
    titleImportance: "Importance",
    taskliststyle: 0
  };

  render() {
    const {
      task,
      titleTitle,
      titleText,
      titleDate,
      titleImportance,
      importances,
      taskliststyle
    } = this.props;

    return (
      <Panel.Body>
        <Grid>
          <Row>
            <form>
              <Col xs={12} sm={taskliststyle ? 12 : 2}>
                <FormGroup>
                  <ControlLabel>{titleTitle}</ControlLabel>
                  <FormControl
                    type="input"
                    value={task.title}
                    onChange={ev => this.changeFieldOfTask(ev, "title")}
                  />
                </FormGroup>
              </Col>
              <Col xs={12} sm={taskliststyle ? 12 : 6}>
                <FormGroup>
                  <ControlLabel>{titleText}</ControlLabel>
                  <FormControl
                    type="input"
                    value={task.text}
                    onChange={ev => this.changeFieldOfTask(ev, "text")}
                  />
                </FormGroup>
              </Col>
              <Col xs={6} sm={taskliststyle ? 12 : 2}>
                <FormGroup>
                  <ControlLabel>{titleDate}</ControlLabel>
                  <Datetime
                    value={Date.parse(this.props.task.date)}
                    dateFormat="DD MMM YYYY"
                    timeFormat="HH:mm"
                    onChange={this.setDate}
                  />
                </FormGroup>
              </Col>
              <Col xs={6} sm={taskliststyle ? 12 : 2}>
                <SelectForm
                  title={titleImportance}
                  field="importance"
                  changeFunction={this.changeFieldOfTask}
                  currentValue={+task.importance}
                  options={[
                    { value: 0, title: importances[1] },
                    { value: 1, title: importances[2] },
                    { value: 3, title: importances[3] }
                  ]}
                />
              </Col>
            </form>
          </Row>
        </Grid>
      </Panel.Body>
    );
  }

  setDate = moment => {
    const task = { ...this.props.task };

    // Adding valid date to the task
    task.date = moment.length ? "" : moment.format("DD MMM YYYY HH:mm");

    this.props.reverseFlowFunction(task);
  };

  changeFieldOfTask = (ev, field) => {
    // Change field 'field' of the current task
    const task = { ...this.props.task };

    task[field] = ev.target.value;

    this.props.reverseFlowFunction(task);
  };
}

export default connect(state => {
  return {
    titleTitle: state.language.titleTitle,
    titleText: state.language.titleText,
    titleDate: state.language.titleDate,
    titleImportance: state.language.titleImportance,
    importances: state.language.importances
  };
})(FormTaskData);
