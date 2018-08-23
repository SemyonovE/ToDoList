import React from "react";

import { Col, FormControl, ControlLabel, FormGroup } from "react-bootstrap";

export default ({ sm, title, taskTitle, reverseFunc }) => (
  <Col xs={12} sm={sm}>
    <FormGroup>
      <ControlLabel>{title}</ControlLabel>
      <FormControl type="input" value={taskTitle} onChange={reverseFunc} />
    </FormGroup>
  </Col>
);
