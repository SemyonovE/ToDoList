import React from "react";
import { SliderPicker } from "react-color";
import { connect } from "react-redux";
import { changeColorStyle } from "../actionCreator";
import styled from "styled-components";

import { Panel, MenuItem } from "react-bootstrap";

import { Consumer } from "../context";

const PanelStyled = styled(Panel)`
  margin: 9px 0 0;
`;

class ColorStyle extends React.Component {
  state = {
    openColorPicker: false,
    color: null
  };

  render = ({ colorStyle, changeColorStyle } = this.props) => (
    <React.Fragment>
      <Consumer>
        {({ LANG: { colorStyleToggle } }) => (
          <MenuItem eventKey="color-style" onClick={this.toggleColorPicker}>
            {colorStyleToggle}
          </MenuItem>
        )}
      </Consumer>
      {this.state.openColorPicker && (
        <PanelStyled>
          <Panel.Body>
            <SliderPicker
              color={colorStyle}
              onChangeComplete={color => changeColorStyle(color.hex)}
            />
          </Panel.Body>
        </PanelStyled>
      )}
    </React.Fragment>
  );

  toggleColorPicker = () =>
    this.setState(pS => ({ openColorPicker: !pS.openColorPicker }));
}

const WithConnect = connect(
  ({ setting: { colorStyle } }) => ({ colorStyle }),
  { changeColorStyle }
)(ColorStyle);

export { WithConnect as ColorStyle };
