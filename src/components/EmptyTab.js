import React from "react";

import { Panel } from "react-bootstrap";

import tabDecorator from "../decorators/tabDecorator";

// The component send created task to reducer for addition the task to list
const EmptyTab = () => (
  <Panel bsStyle="info">
    <Panel.Heading className="height-43-px" />
  </Panel>
);

export default tabDecorator(EmptyTab); // Decorator for make this form for tab
