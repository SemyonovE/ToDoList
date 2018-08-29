import React from "react";
import { string, func, number, arrayOf } from "prop-types";

import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";

import { optionType } from "../types";

const SelectForm = ({ title, changeFunction, currentValue, options }) => (
  <FormGroup>
    <ControlLabel>{title}</ControlLabel>
    <FormControl
      componentClass="select"
      value={currentValue}
      onChange={ev => changeFunction(+ev.target.value)}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.title}
        </option>
      ))}
    </FormControl>
  </FormGroup>
);

SelectForm.propTypes = {
  title: string.isRequired, // Text of the title of the select
  changeFunction: func.isRequired, // Function for changing parameter
  currentValue: number.isRequired, // Value of the current selected option
  options: arrayOf(optionType.isRequired).isRequired // Array of the options for the select
};

export { SelectForm };
