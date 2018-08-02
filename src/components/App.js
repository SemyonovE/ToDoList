import React from "react";
import store from "../store";
import { Provider } from "react-redux";

import { Jumbotron, Grid, Row, Col, Tabs } from "react-bootstrap";

import Filter from "./Filter";
import CreateTask from "./CreateTask";
import TasksList from "./TaskList";

import {
  saveToLocalStorage,
  loadFromLocalStorage
} from "../helpers/workWithStorage";

export default class App extends React.Component {
  state = {
    filterKey: -1,
    displayMode: -1,
    listAuthor: loadFromLocalStorage("My", "listAuthor")
  };

  render() {
    const { filterKey, displayMode, listAuthor } = this.state;

    return (
      <Provider store={store}>
        <Jumbotron className="without-margins all-screen">
          <Grid>
            <Row>
              <Col xs={12}>
                <h1>
                  <span
                    onClick={this.chandeListAuthor}
                    className="select-when-hover"
                  >
                    {listAuthor}
                  </span>{" "}
                  ToDo List:
                </h1>
                <Tabs
                  // bsStyle="pills"
                  defaultActiveKey={1}
                  animation={false}
                  id="uncontrolled-tab-example"
                >
                  {/* Form for set main fields of the task and create new task */}
                  <CreateTask
                    eventKey={1}
                    title="Creating the new task"
                  />
                  {/* Future filter for display selected tasks */}
                  <Filter
                    eventKey={2}
                    title="Filters"
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
      </Provider>
    );
  }

  changeFilterParameter = (ev, filter) => {
    this.setState({
      [filter]: +ev.target.value
    });
  };

  chandeListAuthor = () => {
    let Author = loadFromLocalStorage("My", "listAuthor");
    const answer = prompt("How can I call you?", Author);
    if (answer) {
      saveToLocalStorage(answer, "listAuthor");
      this.setState({
        listAuthor: answer
      });
    }
  };
}
