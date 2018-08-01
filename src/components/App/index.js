import React from "react";
import store from "../../store";
import { Provider } from "react-redux";

import Filter from "../Filter";
import CreateTask from "../CreateTask";
import TasksList from "../TaskList";

import { Jumbotron, Grid, Row, Col } from "react-bootstrap";

import "./App.css";

export default class App extends React.Component {
  state = {
    filterKey: -1,
    displayMode: -1
  };

  render() {
    return (
      <Provider store={store}>
        <Jumbotron className="withoutmargins allscreen">
          <Grid>
            <Row className="show-grid">
              <Col xs={12} sm={12}>
                <h1>My ToDo List:</h1>

                {/* Future filter for display selected tasks */}
                <Filter
                  filterKey={this.state.filterKey}
                  displayMode={this.state.displayMode}
                  changeFilter={this.changeFilter}
                  changeDisplayMode={this.changeDisplayMode}
                />

                {/* Form for set main fields of the task and create new task */}
                <CreateTask />

                {/* Displaying everything tasks with its properties */}
                <TasksList
                  filterKey={this.state.filterKey}
                  displayMode={this.state.displayMode}
                />
              </Col>
            </Row>
          </Grid>
        </Jumbotron>
      </Provider>
    );
  }

  changeFilter = key => {
    this.setState({
      filterKey: key
    });
  };

  changeDisplayMode = mode => {
    this.setState({
      displayMode: mode
    });
  };
}
