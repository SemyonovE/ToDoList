import React from "react";
import { GithubPicker } from "react-color";
import { connect } from "react-redux";
import { changeColorStyle } from "../actionCreator";
import styled from "styled-components";

import { Consumer } from "../context";
import ButtonWithTrigger from "./ButtonWithTrigger";

const ColorStyleStyled = styled.div`
  z-index: 1000;
  position: fixed;
  top: 40px;
  right: 10px;
`;

const StyledPicker = styled(GithubPicker)`
  position: fixed !important;
  top: 65px;
  right: 12px;
`;

class ColorStyle extends React.Component {
  state = {
    openColorPicker: false
  };

  render = ({ colorStyle, changeColorStyle } = this.props) => (
    <ColorStyleStyled>
      <Consumer>
        {({ LANG: { colorStyleToggle } }) => (
          <React.Fragment>
            <ButtonWithTrigger
              iconType="tint"
              tooltipText={colorStyleToggle}
              activateFunction={this.toggleColorPicker}
            />
            {this.state.openColorPicker && (
              <StyledPicker
                triangle="hide"
                color={colorStyle}
                onChange={color => {
                  changeColorStyle(color.hex);
                  this.toggleColorPicker();
                }}
              />
            )}
          </React.Fragment>
        )}
      </Consumer>
    </ColorStyleStyled>
  );

  toggleColorPicker = () =>
    this.setState(pS => ({ openColorPicker: !pS.openColorPicker }));
}

export default connect(
  ({ setting: { colorStyle } }) => ({ colorStyle }),
  { changeColorStyle }
)(ColorStyle);
