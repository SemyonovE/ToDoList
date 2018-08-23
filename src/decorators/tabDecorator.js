import React from "react";

import { Tab } from "react-bootstrap";

export default Component => ({ eventKey, title, ...props }) => (
  <Tab {...{ eventKey, title }}>
    <Component {...props} />
  </Tab>
);
