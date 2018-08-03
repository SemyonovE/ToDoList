import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Jumbotron, Grid, Row, Col, Tabs } from "react-bootstrap";

import Filter from "./Filter";
import CreateTask from "./CreateTask";
import TasksList from "./TaskList";
import Language from "./Language";

import {
  saveToLocalStorage,
  loadFromLocalStorage
} from "../helpers/workWithStorage";

const initialFilter = {
  filterKey: -1,
  displayMode: -1
};

class App extends React.Component {
  static propTypes = {
    appHeader: PropTypes.string.isRequired, // Text of the header
    authorDefault: PropTypes.string.isRequired, // 'My' to indicate of the author of the list
    propmptText: PropTypes.string.isRequired, // Text for prompt, when user will want to change its name
    navbarTitles: PropTypes.arrayOf(PropTypes.string).isRequired // Array of the titles of the navigation tabs
  };

  // Initialize filter parameters:
  //  filterKey for filtering by importance:
  //    -1 : everything
  //     0 : normal
  //     1 : importance
  //     2 : very importance
  //  displayMode for filterring by complete:
  //    -1 : enerything
  //     0 : currents
  //     1 : completed
  state = initialFilter;

  render() {
    const { filterKey, displayMode } = this.state;

    // Creating storage with name of author of the list, on the first start
    const author = loadFromLocalStorage("", "listAuthor");

    return (
      <Jumbotron className="without-margins all-screen">
        <Language />
        <Grid>
          <Row>
            <Col xs={12}>
              <h1>
                {" "}
                {/* Header with author's name or 'mine' and application name */}
                <span
                  onClick={this.chandeListAuthor}
                  className="select-when-hover"
                >
                  {author ? author : this.props.authorDefault}
                </span>
                {" " + this.props.appHeader + ":"}
              </h1>
              <Tabs
                defaultActiveKey={1}
                animation={false}
                id="uncontrolled-tab-example"
              >
                {/* Form for set main fields of the task and create new task */}
                <CreateTask eventKey={1} title={this.props.navbarTitles[0]} />
                {/* Future filter for display selected tasks */}
                <Filter
                  eventKey={2}
                  title={this.props.navbarTitles[1]}
                  filterKey={filterKey}
                  displayMode={displayMode}
                  changeFilterParameter={this.changeFilterParameter}
                  clearFilters={this.clearFilters}
                />
              </Tabs>
              {/* Displaying everything tasks with its properties */}
              <TasksList filterKey={filterKey} displayMode={displayMode} />
            </Col>
          </Row>
        </Grid>
      </Jumbotron>
    );
  }

  clearFilters = () => {
    // Initial of the filter's parameters
    this.setState(initialFilter);
  };

  changeFilterParameter = (ev, filter) => {
    // Change filter parameter that is needed
    this.setState({
      [filter]: +ev.target.value
    });
  };

  chandeListAuthor = () => {
    // Attempt load of the author's name
    let Author = loadFromLocalStorage("", "listAuthor");

    // Receiving new author's name from the user
    const answer = prompt(this.props.propmptText, Author);

    if (answer) {
      // Save the author's name and updating of state
      saveToLocalStorage(answer, "listAuthor");

      this.setState({
        listAuthor: answer
      });
    }
  };
}

export default connect(state => {
  return {
    appHeader: state.language.appHeader,
    authorDefault: state.language.authorDefault,
    propmptText: state.language.propmptText,
    navbarTitles: state.language.navbarTitles
  };
})(App);
