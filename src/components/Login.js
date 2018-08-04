import React from "react";
import PropTypes from "prop-types";

import { Glyphicon, DropdownButton, MenuItem } from "react-bootstrap";

class Login extends React.Component {
  static propTypes = {
    toggleLogin: PropTypes.func.isRequired, // Function for logout
    userName: PropTypes.string.isRequired // Name of the user
  };

  render() {
    return (
      <div className="login">
        <span>{this.props.userName} </span>
        <DropdownButton
          pullRight
          bsStyle="primary"
          bsSize="xsmall"
          title={<Glyphicon glyph="user" />}
          id="user"
        >
          {/* <MenuItem divider /> */}
          <MenuItem eventKey="exit" onClick={this.props.toggleLogin}>
            Exit
          </MenuItem>
        </DropdownButton>
      </div>
    );
  }
}

export default Login;
