import React from "react";
import styled from "styled-components";

import { Consumer } from "../context";
import ButtonWithTrigger from "./ButtonWithTrigger";

const Language = styled.div`
  z-index: 1000;
  position: fixed;
  top: 10px;
  right: 43px;
`;

export default () => (
  <Language>
    <Consumer>
      {({ toggleLanguage, LANG: { toggleLanguageTooltip } }) => (
        <ButtonWithTrigger
          iconType="book"
          tooltipText={toggleLanguageTooltip}
          activateFunction={toggleLanguage}
        />
      )}
    </Consumer>
  </Language>
);
