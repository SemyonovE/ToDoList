import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { editTask } from "../../actionCreator";

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

class TaskEditor extends Component {
  static propTypes = {
    task: PropTypes.object,
    toggleEditMode: PropTypes.func
  };

  state = {
    task: { ...this.props.task }
  };

  render() {
    const { task } = this.state;

    return (
      <Panel>
        <Panel.Heading className="clear">
          <span className="right">
            <Button
              bsStyle="success"
              bsSize="xsmall"
              onClick={this.editCurrentTask}
            >
              <Glyphicon glyph="ok-circle" />
            </Button>
            <Button
              bsStyle="danger"
              bsSize="xsmall"
              onClick={this.props.toggleEditMode}
            >
              <Glyphicon glyph="remove-circle" />
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
                    <FormControl
                      type="input"
                      value={task.date}
                      onChange={ev => this.changeFieldOfTask(ev, "date")}
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

  editCurrentTask = () => {
    const { editTask } = this.props;
    editTask(this.state.task);
    this.props.toggleEditMode()
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
  { editTask }
)(TaskEditor);
