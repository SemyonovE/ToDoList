import React from "react";
import styled from "styled-components";

import { Panel } from "react-bootstrap";

import tabDecorator from "../decorators/tabDecorator";

const PanelStyled = styled(Panel.Heading)`
  height: 43px;
`;

// The component send created task to reducer for addition the task to list
const EmptyTab = () => (
  <Panel bsStyle="info">
    <PanelStyled />
  </Panel>
);

export default tabDecorator(EmptyTab); // Decorator for make this form for tab
