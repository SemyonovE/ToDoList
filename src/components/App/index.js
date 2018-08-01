import React from "react";
import store from "../../store";
import { Provider } from "react-redux";

import Filter from "../Filter";
import CreateTask from "../CreateTask";
import TasksList from "../TasksList";

import "./App.css";

export default function App(props) {
  return (
    <Provider store={store}>
      <div className="body">
        <h1>My To Do List:</h1>

        {/* Future filter for display selected tasks */}
        <Filter />

        {/* Form for set main fields of the task and create new task */}
        <CreateTask />

        {/* Displaying everything tasks with its properties */}
        <TasksList />
      </div>
    </Provider>
  );
}
