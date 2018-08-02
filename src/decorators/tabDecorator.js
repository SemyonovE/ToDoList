import React from "react";

import { Tab } from "react-bootstrap";

export default Component =>
  function TabDecorator(props) {
    const { eventKey, title } = props;

    return (
      <Tab eventKey={eventKey} title={title}>
        <Component {...props} />
      </Tab>
    );
  };
