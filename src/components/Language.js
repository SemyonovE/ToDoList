import React from "react";

import { MenuItem } from "react-bootstrap";

import { Consumer } from "../context";

export default () => (
  <Consumer>
    {({ toggleLanguage, LANG: { toggleLanguageTooltip } }) => (
      <MenuItem eventKey="language" onClick={toggleLanguage}>
        {toggleLanguageTooltip}
      </MenuItem>
    )}
  </Consumer>
);
