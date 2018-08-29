import React from "react";
import { connect } from "react-redux";
import { changeLanguage } from "../actionCreator";

import { MenuItem } from "react-bootstrap";

import { Consumer } from "../context";

const Language = ({ changeLanguage }) => (
  <Consumer>
    {({ LANG: { toggleLanguageTooltip } }) => (
      <MenuItem eventKey="language" onClick={changeLanguage}>
        {toggleLanguageTooltip}
      </MenuItem>
    )}
  </Consumer>
);

export default connect(
  null,
  { changeLanguage }
)(Language);
