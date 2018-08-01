import React from "react";
import PropTypes from "prop-types";

import {
  Panel,
  Grid,
  Row,
  Col,
  FormControl,
  ControlLabel,
  FormGroup
} from "react-bootstrap";

import Datetime from "react-datetime";

import "../../../node_modules/react-datetime/css/react-datetime.css";

//Empty task for initialization of the state of the component
const initTask = () => ({
  id: "",
  title: "",
  text: "",
  importance: "0",
  date: "",
  finished: ""
});

//The component send created task to reducer for addition the task to list
class FormTaskData extends React.Component {
  static propTypes = {
    task: PropTypes.object,
    reverseFlowFunction: PropTypes.func
  };

  static defaultProps = {
    task: initTask()
  };

  render() {
    const { task } = this.props;

    return (
      <Panel.Body>
        <Grid>
          <Row>
            <form>
              <Col xs={12} sm={2}>
                <FormGroup>
                  <ControlLabel>Title</ControlLabel>
                  <FormControl
                    type="input"
                    value={task.title}
                    onChange={ev => this.changeFieldOfTask(ev, "title")}
                  />
                </FormGroup>
              </Col>
              <Col xs={12} sm={6}>
                <FormGroup>
                  <ControlLabel>Text</ControlLabel>
                  <FormControl
                    type="input"
                    value={task.text}
                    onChange={ev => this.changeFieldOfTask(ev, "text")}
                  />
                </FormGroup>
              </Col>
              <Col xs={6} sm={2}>
                <FormGroup>
                  <ControlLabel>Date</ControlLabel>
                  <Datetime
                    value={Date.parse(this.props.task.date)}
                    dateFormat="DD MMM YYYY"
                    timeFormat="HH:mm"
                    onChange={this.setDate}
                  />
                </FormGroup>
              </Col>
              <Col xs={6} sm={2}>
                <FormGroup>
                  <ControlLabel>Importance</ControlLabel>
                  <FormControl
                    componentClass="select"
                    value={task.importance}
                    onChange={ev => this.changeFieldOfTask(ev, "importance")}
                  >
                    <option value="0">normal</option>
                    <option value="1">important</option>
                    <option value="3">very important</option>
                  </FormControl>
                </FormGroup>
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

    //Backflow function to change task
    this.props.reverseFlowFunction(task);
  };

  changeFieldOfTask = (ev, field) => {
    //Change field 'field' of the current task
    const task = { ...this.props.task };
    task[field] = ev.target.value;

    //Backflow function to change task
    this.props.reverseFlowFunction(task);
  };
}

export default FormTaskData;
