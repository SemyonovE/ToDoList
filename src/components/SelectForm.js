import React from "react";
import PropTypes from "prop-types";

import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";

import { optionType } from "../types";
import noSetFunction from "../helpers/notSetFunction";

SelectForm.propTypes = {
  title: PropTypes.string, // Text of the title of the select
  field: PropTypes.string, // Which parameter needs select
  changeFunction: PropTypes.func, // Function for changing parameter
  currentValue: PropTypes.number.isRequired, // Value of the current selected option
  options: PropTypes.arrayOf(optionType.isRequired).isRequired // Array of the options for the select
};

SelectForm.defaultProps = {
  title: "Title",
  field: "field",
  changeFunction: noSetFunction
};

function SelectForm(props) {
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

export default SelectForm;
