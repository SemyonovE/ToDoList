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
import Language from "./Language";
import TaskListStyle from "./TaskListStyle";
import ColorStyle from "./ColorStyle";

const LoginStyled = styled.div`
  z-index: 999;
  position: fixed;
  top: 12px;
  right: 15px;

  ul {
    min-width: calc(min(100vw - 30px, 300px));
  }

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
      <TaskListStyle />
      <Language />
      <ColorStyle />
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
