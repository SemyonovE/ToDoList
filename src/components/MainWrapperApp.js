import React from "react";
import App from "./App";
import { connect } from "react-redux";
import { loadingFromServer } from "../actionCreator";

import Login from "./Login";
import LoginModal from "./LoginModal";

import moment from "moment";
import "moment/locale/ru";

import { Provider } from "../context";
import LANG from "../helpers/dictionary";
import { getCookies } from "../helpers/workWithCookies";

const momentSetting = { week: { dow: 1 } };

class MainWrapperApp extends React.Component {
  constructor(props) {
    super(props);

    const userdata = getCookies();
    typeof userdata === "object" && props.loadingFromServer(userdata, true);
  }

  state = ((layout = this.props.language) => ({
    lang: layout,
    LANG: LANG[layout]
  }))();

  componentWillReceiveProps(nextProps) {
    nextProps.language !== this.props.language &&
      this.setState({
        lang: nextProps.language,
        LANG: LANG[nextProps.language]
      });
  }

  render = ({ lang } = this.state, { login } = this.props) => {
    moment.updateLocale(lang, momentSetting);

    return (
      <Provider value={this.state}>
        {login ? (
          <React.Fragment>
            <Login />
            <App />
          </React.Fragment>
        ) : (
          <LoginModal />
        )}
      </Provider>
    );
  };
}

export default connect(
  ({ user: { login }, setting: { language } }) => ({
    login,
    language
  }),
  { loadingFromServer }
)(MainWrapperApp);
