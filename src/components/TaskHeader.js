import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteTask, editTask } from "../actionCreator";

import {
  Glyphicon,
  Grid,
  Row,
  Col,
  Panel,
  OverlayTrigger,
  Tooltip
} from "react-bootstrap";
import moment from "../../node_modules/moment";

import ButtonWithTrigger from "./ButtonWithTrigger";

import { taskType } from "../types";
import noSetFunction from "../helpers/notSetFunction";

// The component receive the task and display its
class TaskHeader extends React.Component {
  static propTypes = {
    task: taskType.isRequired, // Object of the task
    toggleEditMode: PropTypes.func, // Function for toggle of edit mode
    deleteTask: PropTypes.func, // Finction for delete of the task
    editTask: PropTypes.func, // Function for edit of the task
    importanceTooltip: PropTypes.string.isRequired, // Text of Tooltip
    editTTaskooltip: PropTypes.string.isRequired, // Text of Tooltip
    completeTaskTooltip: PropTypes.string.isRequired, // Text of Tooltip
    incompleteTaskTooltip: PropTypes.string.isRequired, // Text of Tooltip
    deleteTaskTooltip: PropTypes.string.isRequired, // Text of Tooltip
    daysLeftTooltip: PropTypes.string.isRequired // Text of Tooltip
  };

  static defaultProps = {
    toggleEditMode: noSetFunction,
    deleteTask: noSetFunction,
    editTask: noSetFunction
  };

  render() {
    const {
      task,
      importanceTooltip,
      editTTaskooltip,
      completeTaskTooltip,
      incompleteTaskTooltip,
      deleteTaskTooltip,
      daysLeftTooltip
    } = this.props;

    // Count of fires
    const importance = "!"
      .repeat(+task.importance)
      .split("")
      .map((_, index) => <Glyphicon key={index} glyph="fire" />);

    const date = new Date(Date.parse(task.date || new Date()));
    const today = new Date();
    const daysLeft =
      date >= today ? Math.ceil((date - today) / (1000 * 60 * 60 * 24)) : null;

    return (
      <Panel.Heading>
        <Grid className="clear">
          <Row>
            <Col xs={4} className="without-paddings">
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip id={task.id + "importance"}>
                    {importanceTooltip}
                  </Tooltip>
                }
              >
                <span className="task-importance left">{importance}</span>
              </OverlayTrigger>
            </Col>
            <Col xs={2} className="without-paddings">
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip id={task.id + "daysLeft"}>{daysLeftTooltip}</Tooltip>
                }
              >
                <span className="left days-left">
                  {daysLeft && !task.finished
                    ? daysLeft === 1
                      ? "<1"
                      : daysLeft - 1
                    : null}
                </span>
              </OverlayTrigger>
            </Col>
            <Col xs={6} className="without-paddings">
              <span className="right">
                {!task.finished ? (
                  <span>
                    <ButtonWithTrigger
                      id={task.id}
                      iconType="edit"
                      tooltipText={editTTaskooltip}
                      activateFunction={this.props.toggleEditMode}
                      buttonStyle="primary"
                    />
                    <ButtonWithTrigger
                      id={task.id}
                      iconType="check"
                      tooltipText={completeTaskTooltip}
                      activateFunction={this.completeCurrentTask}
                      buttonStyle="success"
                    />
                  </span>
                ) : (
                  <ButtonWithTrigger
                    id={task.id}
                    iconType="unchecked"
                    tooltipText={incompleteTaskTooltip}
                    activateFunction={this.incompleteCurrentTask}
                    buttonStyle="success"
                  />
                )}
                <ButtonWithTrigger
                  id={task.id}
                  iconType="remove"
                  tooltipText={deleteTaskTooltip}
                  activateFunction={this.deleteTask}
                  buttonStyle="danger"
                />
              </span>
            </Col>
          </Row>
        </Grid>
      </Panel.Heading>
    );
  }

  deleteTask = () => {
    const { deleteTask, task } = this.props;

    deleteTask(task.id);
  };

  incompleteCurrentTask = () => {
    const { task, editTask } = this.props;
    let temptask = { ...task };

    temptask.finished = "";

    editTask(temptask);
  };

  completeCurrentTask = () => {
    const { task, editTask } = this.props;
    let temptask = { ...task };

    temptask.finished = moment().format("DD MMM YYYY HH:mm");

    editTask(temptask);
  };
}

export default connect(
  state => {
    return {
      importanceTooltip: state.language.importanceTooltip,
      editTTaskooltip: state.language.editTTaskooltip,
      completeTaskTooltip: state.language.completeTaskTooltip,
      incompleteTaskTooltip: state.language.incompleteTaskTooltip,
      deleteTaskTooltip: state.language.deleteTaskTooltip,
      daysLeftTooltip: state.language.daysLeftTooltip
    };
  },
  { deleteTask, editTask }
)(TaskHeader);
