import React from "react";
import { Consumer } from "../context";
import ButtonWithTrigger from "./ButtonWithTrigger";

export default () => (
  <div className="language">
    <Consumer>
      {({ toggleLanguage, LANG: { toggleLanguageTooltip } }) => (
        <ButtonWithTrigger
          iconType="book"
          tooltipText={toggleLanguageTooltip}
          activateFunction={toggleLanguage}
        />
      )}
    </Consumer>
  </div>
);
