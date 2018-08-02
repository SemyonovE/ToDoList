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

import FilterSelect from "./SelectForm";

import "../../node_modules/react-datetime/css/react-datetime.css";

//The component send created task to reducer for addition the task to list
class FormTaskData extends React.Component {
  static propTypes = {
    task: PropTypes.object,
    reverseFlowFunction: PropTypes.func,
    titleTitle: PropTypes.string,
    titleText: PropTypes.string,
    titleDate: PropTypes.string,
    titleImportance: PropTypes.string,
    importances: PropTypes.array
  };

  render() {
    const {
      task,
      titleTitle,
      titleText,
      titleDate,
      titleImportance,
      importances
    } = this.props;

    return (
      <Panel.Body>
        <Grid>
          <Row>
            <form>
              <Col xs={12} sm={2}>
                <FormGroup>
                  <ControlLabel>{titleTitle}</ControlLabel>
                  <FormControl
                    type="input"
                    value={task.title}
                    onChange={ev => this.changeFieldOfTask(ev, "title")}
                  />
                </FormGroup>
              </Col>
              <Col xs={12} sm={6}>
                <FormGroup>
                  <ControlLabel>{titleText}</ControlLabel>
                  <FormControl
                    type="input"
                    value={task.text}
                    onChange={ev => this.changeFieldOfTask(ev, "text")}
                  />
                </FormGroup>
              </Col>
              <Col xs={6} sm={2}>
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
              <Col xs={6} sm={2}>
                <FilterSelect
                  title={titleImportance}
                  field="importance"
                  changeFunction={this.changeFieldOfTask}
                  currentValue={task.importance}
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
    task.date = moment.length ? "" : moment.format("DD MMM YYYY HH:mm");

    this.props.reverseFlowFunction(task);
  };

  changeFieldOfTask = (ev, field) => {
    //Change field 'field' of the current task
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
