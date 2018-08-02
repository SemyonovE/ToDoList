import React from "react";

import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";

function FilterSelect(props) {
  const body = props.options.map(option => (
    <option key={option.value} value={option.value}>
      {option.title}
    </option>
  ));

  return (
    <FormGroup>
      <ControlLabel>{props.title}</ControlLabel>
      <FormControl
        componentClass="select"
        value={props.currentValue}
        onChange={ev => props.changeFunction(ev, props.field)}
      >
        {body}
      </FormControl>
    </FormGroup>
  );
}

export default FilterSelect;
