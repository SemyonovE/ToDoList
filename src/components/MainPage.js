import React from "react";

import {
  loadTasklist,
  loadSetting,
  changeTasklistStyle,
  changeFilter,
  changeSorter,
  changeDisplayMode
} from "../actionCreator";

import ControlButtons from "./ControlButtons";
import NavigationTab from "./NavigationTab";

import settingDefault from "../helpers/initialParameters";

import { Grid, Row, Col } from "react-bootstrap";

import TasksList from "./TaskList";

class MainPage extends React.Component {
  state = settingDefault;

  render() {
    return (
      <React.Fragment>
        <ControlButtons
          toggleStyleListStyle={this.toggleStyleListStyle}
          toggleLogin={this.toggleLogin}
        />
        <Grid>
          <Row>
            <Col xs={12}>
              <h1>
                {" "}
                {/* Header with author's name or 'mine' and application name */}
                <span
                  onClick={this.chandeDefineHeader}
                  className="select-when-hover"
                >
                  {tempDefine && tempDefine !== ""
                    ? tempDefine
                    : this.props.defaultDefine}
                </span>
                {" " + this.props.appHeader + ":"}
              </h1>
              <NavigationTab
                changeParameter={this.changeParameter}
                clearFilters={this.clearFilters}
                clearSorter={this.clearSorter}
              />
            </Col>
            {/* Displaying everything tasks with its properties */}
            <TasksList
              filterKey={filterKey}
              displayMode={displayMode}
              sorterMode={sorterMode}
              taskliststyle={+taskliststyle}
            />
          </Row>
        </Grid>
      </React.Fragment>
    );
  }

  clearFilters = () => {
    // Initial of the filter's parameters
    this.props.changeFilter(settingDefault.filterKey);
    this.props.changeDisplayMode(settingDefault.displayMode);
  };

  clearSorter = () => {
    // Initial of the filter's parameters
    this.props.changeSorter(settingDefault.sorterMode);
  };

  toggleStyleListStyle = () => {
    const mode = this.props.setting.taskliststyle === 0 ? 1 : 0;
    this.props.changeTasklistStyle(mode);
  };
}

export default MainPage;
