import React from "react";
import PropTypes from "prop-types";

import { OverlayTrigger, Tooltip, Button, Glyphicon } from "react-bootstrap";

import noSetFunction from "../helpers/notSetFunction";

ButtonWithTrigger.propTypes = {
  id: PropTypes.string, // Id for create unique id of the Tooltip component
  iconType: PropTypes.string.isRequired, // Name of the icon for bootstrap
  tooltipText: PropTypes.string.isRequired, // Text on Toolpip
  activateFunction: PropTypes.func, // What to do when user pressed the button
  buttonStyle: PropTypes.string.isRequired // Bootstrap's style for the button
};

ButtonWithTrigger.defaultProps = {
  id: "id",
  activateFunction: noSetFunction
};

function ButtonWithTrigger(props) {
  const { id, iconType, tooltipText, activateFunction, buttonStyle } = props;

  return (
    <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip id={id + iconType}>{tooltipText}</Tooltip>}
    >
      <Button bsStyle={buttonStyle} bsSize="xsmall" onClick={activateFunction}>
        <Glyphicon glyph={iconType} />
      </Button>
    </OverlayTrigger>
  );
}

export default ButtonWithTrigger;
