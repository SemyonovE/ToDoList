import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toggleLanguage } from "../actionCreator";

import ButtonWithTrigger from "./ButtonWithTrigger";

class Language extends React.Component {
  static propTypes = {
    language: PropTypes.string
  };

  render() {
    return (
      <div className="language">
        <ButtonWithTrigger
          id={"lang"}
          iconType="book"
          tooltipText="Toogle language"
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
      language: state.language.language
    };
  },
  { toggleLanguage }
)(Language);
