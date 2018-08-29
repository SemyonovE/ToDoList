import React from "react";
import { func } from "prop-types";
import { connect } from "react-redux";
import { userLogOut } from "../actionCreator";

import { Glyphicon, DropdownButton, MenuItem } from "react-bootstrap";

import { Consumer } from "../context";
import styled from "styled-components";
import { Language, TaskListStyle, ColorStyle } from "./";
import { removeCookies } from "../helpers/workWithCookies";

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

const Login = ({ userLogOut, login }) => (
  <LoginStyled>
    <DropdownButton
      pullRight
      bsStyle="primary"
      bsSize="xsmall"
      title={<Glyphicon glyph="user" />}
      id="user"
    >
      <MenuItem eventKey="user-name" disabled>
        {login}
      </MenuItem>
      <MenuItem divider />
      <TaskListStyle />
      <Language />
      <ColorStyle />
      <MenuItem divider />
      <MenuItem
        eventKey="exit"
        onClick={() => {
          removeCookies();
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
  userLogOut: func.isRequired // Function for logout
};

const WithConnect = connect(
  ({ user: { login } }) => ({ login }),
  { userLogOut }
)(Login);

export { WithConnect as Login };
