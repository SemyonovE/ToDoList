import React from "react";
import { string, func } from "prop-types";

import { OverlayTrigger, Tooltip, Glyphicon, Button } from "react-bootstrap";

import styled from "styled-components";

const MButton = styled(Button)`
  margin: 0 3px;
`;

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
    <MButton bsStyle={buttonStyle} bsSize="xsmall" onClick={activateFunction}>
      <Glyphicon glyph={iconType} />
    </MButton>
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
