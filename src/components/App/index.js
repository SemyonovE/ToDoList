import React from "react";
import store from "../../store";
import { Provider } from "react-redux";

import Filter from "../Filter";
import CreateTask from "../CreateTask";
import TasksList from "../TasksList";

import { Jumbotron, Grid, Row, Col } from "react-bootstrap";

import "./App.css";

export default function App(props) {
  return (
    <Provider store={store}>
      <Jumbotron>
        <Grid>
          <Row className="show-grid">
            <Col xs={12} sm={12}>
              <h1>My ToDo List:</h1>

              {/* Future filter for display selected tasks */}
              <Filter />

              {/* Form for set main fields of the task and create new task */}
              <CreateTask />

              {/* Displaying everything tasks with its properties */}
              <TasksList />
            </Col>
          </Row>
        </Grid>
      </Jumbotron>
    </Provider>
  );
}
