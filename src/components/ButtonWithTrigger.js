import React from "react";
import PropTypes from "prop-types";

import { OverlayTrigger, Tooltip, Button, Glyphicon } from "react-bootstrap";

ButtonWithTrigger.propTypes = {
  id: PropTypes.string,
  iconType: PropTypes.string,
  tooltipText: PropTypes.string,
  activateFunction: PropTypes.func,
  buttonStyle: PropTypes.string
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
