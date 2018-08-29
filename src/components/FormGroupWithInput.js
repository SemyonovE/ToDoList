import React from "react";
import { number, string, func } from "prop-types";

import { Col, FormControl, ControlLabel, FormGroup } from "react-bootstrap";

const FormGroupWithInput = ({ sm, title, value, reverseFunc }) => (
  <Col xs={12} sm={sm}>
    <FormGroup>
      <ControlLabel>{title}</ControlLabel>
      <FormControl type="input" {...{ value }} onChange={reverseFunc} />
    </FormGroup>
  </Col>
);

FormGroupWithInput.propTypes = {
  sm: number.isRequired, // Value for medium screen
  title: string.isRequired, // Title of the label
  value: string.isRequired, // Value of the input
  reverseFunc: func.isRequired // Function after changing of the input
};

export { FormGroupWithInput };
