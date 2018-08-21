import React from "react";
import { connect } from "react-redux";
import { string } from "prop-types";

import Language from "./Language";
import Login from "./Login";
import ButtonWithTrigger from "./ButtonWithTrigger";

import { loadFromLocalStorage } from "../helpers/workWithStorage";

ControlButtons.propTypes = {
  toggleTaskListStyleToggle: string.isRequired // Tooltip
};

function ControlButtons(props) {
  return (
    <React.Fragment>
      <Language />
      <Login
        toggleLogin={props.toggleLogin}
        userName={loadFromLocalStorage("", "userName")}
      />
      <div className="task-list-style">
        <ButtonWithTrigger
          iconType={props.taskliststyle ? "align-justify" : "th"}
          tooltipText={props.toggleTaskListStyleToggle}
          activateFunction={props.toggleStyleListStyle}
        />
      </div>
    </React.Fragment>
  );
}

export default connect(
  state => {
    return {
      toggleTaskListStyleToggle: state.language.toggleTaskListStyleToggle
    };
  }
)(ControlButtons);
