import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { addTask } from "../../actionCreator";

import {
  Button,
  Glyphicon,
  Panel,
  Grid,
  Row,
  Col,
  FormControl,
  ControlLabel,
  FormGroup
} from "react-bootstrap";

import Datetime from 'react-datetime'

import hashCode from "../../hashCode";

import '../../../node_modules/react-datetime/css/react-datetime.css'

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
class CreateTask extends React.Component {
  static propTypes = {
    addTask: PropTypes.func
  };

  state = {
    task: initTask()
  };

  render() {
    const { task } = this.state;

    return (
      <Panel bsStyle="info">
        <Panel.Heading className="clear">
          <span className="right">
            <Button
              bsStyle="primary"
              bsSize="xsmall"
              onClick={this.addTaskToList}
            >
              <Glyphicon glyph="plus" />
            </Button>
          </span>
        </Panel.Heading>
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
                      value={Date.parse(this.state.task.date)}
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
      </Panel>
    );
  }

  setDate = (moment) => {
    const task = { ...this.state.task };
    if(moment.length) return
    task.date = moment.format("DD MMM YYYY HH:mm");

    this.setState({
      task: task
    });
  }

  addTaskToList = () => {
    const { addTask } = this.props;
    const task = {...this.state.task};

    //Validation of fields of the task
    if (task.title === "") {
      alert("The title of your new task is empty!");
      return;
    }
    if (task.text === "") {
      alert("The text of your new task is empty!");
      return;
    }
    if (task.importance === "") {
      alert("You don't select importance of current task!");
      return;
    }

    task.id = hashCode(task.title + task.text + task.date);

    //Change store by add the task
    addTask(task);

    //Clear the task and fields of creating form
    this.setState({
      task: initTask()
    });
  };

  changeFieldOfTask = (ev, field) => {
    //Change field 'field' of the current task
    const task = { ...this.state.task };
    task[field] = ev.target.value;

    this.setState({
      task: task
    });
  };
}

export default connect(
  null,
  { addTask }
)(CreateTask);
