import React from "react";
import { func, instanceOf } from "prop-types";
import { connect } from "react-redux";
import { userLogOut } from "../actionCreator";
import { withCookies, Cookies } from "react-cookie";

import { Glyphicon, DropdownButton, MenuItem } from "react-bootstrap";

import { Consumer } from "../context";
import {
  loadFromLocalStorage,
  saveToLocalStorage
} from "../helpers/workWithStorage";
import styled from "styled-components";

const LoginStyled = styled.div`
  z-index: 1000;
  position: fixed;
  top: 10px;
  right: 80px;

  a {
    text-align: right;
  }
`;

const Login = ({ userLogOut, cookies }) => (
  <LoginStyled>
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
          userLogOut();
        }}
      >
        <Consumer>
          {({ LANG: { exitButtonTooltip } }) => exitButtonTooltip}
        </Consumer>
      </MenuItem>
    </DropdownButton>
  </LoginStyled>
);

Login.propTypes = {
  userLogOut: func.isRequired, // Function for logout
  cookies: instanceOf(Cookies).isRequired // Cookies
};

export default connect(
  null,
  { userLogOut }
)(withCookies(Login));
