import React from "react";
import { string, func } from "prop-types";

import { OverlayTrigger, Tooltip, Button, Glyphicon } from "react-bootstrap";

import noSetFunction from "../helpers/notSetFunction";

ButtonWithTrigger.propTypes = {
  id: string, // Id for create unique id of the Tooltip component
  iconType: string.isRequired, // Name of the icon for bootstrap
  tooltipText: string.isRequired, // Text on Toolpip
  activateFunction: func, // What to do when user pressed the button
  buttonStyle: string // Bootstrap's style for the button
};

ButtonWithTrigger.defaultProps = {
  id: "id",
  activateFunction: noSetFunction,
  buttonStyle: "primary"
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
