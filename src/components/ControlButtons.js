import React from "react";

import Language from "./Language";
import Login from "./Login";
import TaskListStyle from "./TaskListStyle";
import ColorStyle from "./ColorStyle";

export default ({ toggleLogin }) => (
  <React.Fragment>
    <Language />
    <Login {...{ toggleLogin }} />
    <TaskListStyle />
    <ColorStyle />
  </React.Fragment>
);
