import React from "react";
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
  FormGroup,
  OverlayTrigger,
  Tooltip
} from "react-bootstrap";

import Datetime from "react-datetime";

import "../../../node_modules/react-datetime/css/react-datetime.css";

class TaskEditor extends React.Component {
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
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id={task.id + "ok"}>Set changes</Tooltip>}
            >
              <Button
                bsStyle="success"
                bsSize="xsmall"
                onClick={this.editCurrentTask}
              >
                <Glyphicon glyph="ok-circle" />
              </Button>
            </OverlayTrigger>
            <OverlayTrigger
              placement="bottom"
              overlay={
                <Tooltip id={task.id + "cancel"}>Cansel changes</Tooltip>
              }
            >
              <Button
                bsStyle="danger"
                bsSize="xsmall"
                onClick={this.props.toggleEditMode}
              >
                <Glyphicon glyph="remove-circle" />
              </Button>
            </OverlayTrigger>
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
                      defaultValue={this.state.task.date}
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

  setDate = moment => {
    const task = { ...this.state.task };
    task.date = moment.format("DD MMM YYYY HH:mm");

    this.setState({
      task: task
    });
  };

  editCurrentTask = () => {
    const { editTask } = this.props;
    editTask(this.state.task);
    this.props.toggleEditMode();
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
