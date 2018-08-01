import React from "react";

import { Col, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

function FilterSelect(props) {
  const body = props.options.map(option => (
    <option key={option.value} value={option.value}>
      {option.title}
    </option>
  ));
  return (
    <Col xs={12} sm={6}>
      <FormGroup>
        <ControlLabel>{props.title}</ControlLabel>
        <FormControl
          componentClass="select"
          value={props.currentValue}
          onChange={ev => props.changeFunction(+ev.target.value)}
        >
          {body}
        </FormControl>
      </FormGroup>
    </Col>
  );
}

export default FilterSelect;
