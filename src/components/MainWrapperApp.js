import React from "react";
// import App from "./App";
import { App } from "./";
import { connect } from "react-redux";
import { loadingFromServer } from "../actionCreator";

import { Login, LoadingSpinner, LoginModal } from "./";

import moment from "moment";
import "moment/locale/ru";

import { Provider } from "../context";
import LANG from "../helpers/dictionary";
import { getCookies } from "../helpers/workWithCookies";

const momentSetting = { week: { dow: 1 } };

class MainWrapperApp extends React.Component {
  componentDidMount = () => {
    const userdata = getCookies();
    if (typeof userdata === "object") {
      this.props.loadingFromServer(userdata, true);
    }
  };

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

    if (!login && getCookies()) return <LoadingSpinner />;

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

const WithConnect = connect(
  ({ user: { login }, setting: { language } }) => ({
    login,
    language
  }),
  { loadingFromServer }
)(MainWrapperApp);

export { WithConnect as MainWrapperApp };
