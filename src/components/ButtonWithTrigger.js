import React from "react";
import { string, func } from "prop-types";

import { OverlayTrigger, Tooltip, Button, Glyphicon } from "react-bootstrap";

const ButtonWithTrigger = ({
  iconType,
  tooltipText,
  activateFunction,
  buttonStyle
}) => (
  <OverlayTrigger
    placement="bottom"
    overlay={<Tooltip id={iconType}>{tooltipText}</Tooltip>}
  >
    <Button bsStyle={buttonStyle} bsSize="xsmall" onClick={activateFunction}>
      <Glyphicon glyph={iconType} />
    </Button>
  </OverlayTrigger>
);

ButtonWithTrigger.propTypes = {
  iconType: string.isRequired, // Name of the icon for bootstrap
  tooltipText: string.isRequired, // Text on Toolpip
  activateFunction: func.isRequired, // What to do when user pressed the button
  buttonStyle: string // Bootstrap's style for the button
};

ButtonWithTrigger.defaultProps = {
  buttonStyle: "primary"
};

export default ButtonWithTrigger;
