import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toggleLanguage } from "../actionCreator";

import ButtonWithTrigger from "./ButtonWithTrigger";

class Language extends React.Component {
  static propTypes = {
    language: PropTypes.string, // Current language
    toggleLanguageTooltip: PropTypes.string // Text for Tooltip
  };

  render() {
    return (
      <div className="language">
        <ButtonWithTrigger
          id={"lang"}
          iconType="book"
          tooltipText={this.props.toggleLanguageTooltip}
          activateFunction={this.toggleLanguage}
          buttonStyle="primary"
        />
      </div>
    );
  }

  toggleLanguage = () => {
    const { toggleLanguage, language } = this.props;

    toggleLanguage(language === "en" ? "ru" : "en");
  };
}

export default connect(
  state => {
    return {
      language: state.language.language,
      toggleLanguageTooltip: state.language.toggleLanguageTooltip
    };
  },
  { toggleLanguage }
)(Language);
