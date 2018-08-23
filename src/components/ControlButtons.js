import React from "react";

import Language from "./Language";
import Login from "./Login";
import TaskListStyle from "./TaskListStyle";

export default ({ toggleLogin }) => (
  <React.Fragment>
    <Language />
    <Login {...{ toggleLogin }} />
    <TaskListStyle />
  </React.Fragment>
);
