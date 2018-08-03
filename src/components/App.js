import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Jumbotron, Grid, Row, Col, Tabs, Glyphicon } from "react-bootstrap";

import Filter from "./Filter";
import CreateTask from "./CreateTask";
import TasksList from "./TaskList";
import Language from "./Language";

import {
  saveToLocalStorage,
  loadFromLocalStorage
} from "../helpers/workWithStorage";
import Sorter from "./Sorter";

const initialFilter = {
  filterKey: -1,
  displayMode: -1
};

const initialSorter = {
  sorterMode: -1
};

class App extends React.Component {
  static propTypes = {
    appHeader: PropTypes.string.isRequired, // Text of the header
    authorDefault: PropTypes.string.isRequired, // 'My' to indicate of the author of the list
    propmptText: PropTypes.string.isRequired, // Text for prompt, when user will want to change its name
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
  //  sorterMode for sorting tasks:
  //    -1 : default
  //     1 : title
  //     2 : date
  //     3 : first important
  //     4 : first unimportant
  state = { ...initialFilter, ...initialSorter };

  render() {
    const { filterKey, displayMode, sorterMode } = this.state;

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
                <CreateTask eventKey={1} title={<Glyphicon glyph="plus" />} />
                {/* Future filter for display selected tasks */}
                <Filter
                  eventKey={2}
                  title={<Glyphicon glyph="filter" />}
                  filterKey={filterKey}
                  displayMode={displayMode}
                  changeFilterParameter={this.changeParameter}
                  clearFilters={this.clearFilters}
                />
                <Sorter
                  eventKey={3}
                  title={<Glyphicon glyph="sort" />}
                  sorterMode={sorterMode}
                  changeSorterParameter={this.changeParameter}
                  clearSorter={this.clearSorter}
                />
              </Tabs>
              {/* Displaying everything tasks with its properties */}
              <TasksList
                filterKey={filterKey}
                displayMode={displayMode}
                sorterMode={sorterMode}
              />
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

  clearSorter = () => {
    // Initial of the filter's parameters
    this.setState(initialSorter);
  };

  changeParameter = (ev, filter) => {
    // Change parameter that is needed
    this.setState({
      [filter]: +ev.target.value
    });
  };

  chandeListAuthor = () => {
    // Attempt load of the author's name
    let Author = loadFromLocalStorage("", "listAuthor");

    // Receiving new author's name from the user
    const answer = prompt(this.props.propmptText + "?", Author);

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
    propmptText: state.language.propmptText
  };
})(App);
