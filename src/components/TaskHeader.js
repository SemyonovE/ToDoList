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

//The component receive the task and display its
class TaskHeader extends React.Component {
  static propTypes = {
    task: PropTypes.object,
    toggleEditMode: PropTypes.func,
    deleteTask: PropTypes.func,
    editTask: PropTypes.func,
    importanceTooltip: PropTypes.string,
    editTTaskooltip: PropTypes.string,
    completeTaskTooltip: PropTypes.string,
    incompleteTaskTooltip: PropTypes.string,
    deleteTaskTooltip: PropTypes.string
  };

  state = {
    editMode: false
  };

  render() {
    const {
      task,
      importanceTooltip,
      editTTaskooltip,
      completeTaskTooltip,
      incompleteTaskTooltip,
      deleteTaskTooltip
    } = this.props;
    const importance = "!"
      .repeat(+task.importance)
      .split("")
      .map((_, index) => <Glyphicon key={index} glyph="fire" />);

    return (
      <Panel.Heading>
        <Grid className="clear">
          <Row>
            <Col xs={6} className="without-paddings">
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
      deleteTaskTooltip: state.language.deleteTaskTooltip
    };
  },
  { deleteTask, editTask }
)(TaskHeader);
