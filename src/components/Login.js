import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Glyphicon, DropdownButton, MenuItem } from "react-bootstrap";

class Login extends React.Component {
  static propTypes = {
    toggleLogin: PropTypes.func.isRequired, // Function for logout
    userName: PropTypes.string.isRequired, // Name of the user
    toggleLanguageTooltip: PropTypes.string.isRequired // Tooltip
  };

  render() {
    return (
      <div className="login">
        <DropdownButton
          pullRight
          bsStyle="primary"
          bsSize="xsmall"
          title={<Glyphicon glyph="user" />}
          id="user"
        >
          <MenuItem eventKey="user-name" disabled>
            {this.props.userName}
          </MenuItem>
          <MenuItem divider />
          <MenuItem eventKey="exit" onClick={this.props.toggleLogin}>
            {this.props.toggleLanguageTooltip}
          </MenuItem>
        </DropdownButton>
      </div>
    );
  }
}

export default connect(state => {
  return {
    toggleLanguageTooltip: state.language.exitButtonTooltip
  };
})(Login);
