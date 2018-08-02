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

class App extends React.Component {
  static propTypes = {
    appHeader: PropTypes.string,
    authorDefault: PropTypes.string,
    propmptText: PropTypes.string,
    navbarTitles: PropTypes.array
  };

  state = {
    filterKey: -1,
    displayMode: -1
  };

  render() {
    const { filterKey, displayMode } = this.state;
    const author = loadFromLocalStorage("", "listAuthor");

    return (
      <Jumbotron className="without-margins all-screen">
        <Language />
        <Grid>
          <Row>
            <Col xs={12}>
              <h1>
                <span
                  onClick={this.chandeListAuthor}
                  className="select-when-hover"
                >
                  {author ? author : this.props.authorDefault}
                </span>
                {" " + this.props.appHeader + ":"}
              </h1>
              <Tabs
                // bsStyle="pills"
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

  changeFilterParameter = (ev, filter) => {
    this.setState({
      [filter]: +ev.target.value
    });
  };

  chandeListAuthor = () => {
    let Author = loadFromLocalStorage("", "listAuthor");
    const answer = prompt(this.props.propmptText, Author);
    if (answer) {
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
