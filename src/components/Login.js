import React from "react";
import { func, instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";

import { Glyphicon, DropdownButton, MenuItem } from "react-bootstrap";

import { Consumer } from "../context";
import {
  loadFromLocalStorage,
  saveToLocalStorage
} from "../helpers/workWithStorage";

const Login = ({ toggleLogin, cookies }) => (
  <div className="login">
    <DropdownButton
      pullRight
      bsStyle="primary"
      bsSize="xsmall"
      title={<Glyphicon glyph="user" />}
      id="user"
    >
      <MenuItem eventKey="user-name" disabled>
        {loadFromLocalStorage("", "userName")}
      </MenuItem>
      <MenuItem divider />
      <MenuItem
        eventKey="exit"
        onClick={() => {
          cookies.set("userdata", "false");
          saveToLocalStorage(null, "userName");
          toggleLogin();
        }}
      >
        <Consumer>
          {({ LANG: { exitButtonTooltip } }) => exitButtonTooltip}
        </Consumer>
      </MenuItem>
    </DropdownButton>
  </div>
);

Login.propTypes = {
  toggleLogin: func.isRequired, // Function for logout
  cookies: instanceOf(Cookies).isRequired // Cookies
};

export default withCookies(Login);
