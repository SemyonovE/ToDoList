import React from "react";
import store from "../store";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";

import moment from "moment";

import App from "./App";

export default class Root extends React.Component {
  render() {
    moment.updateLocale("ru", {
      week: {
        dow: 1
      }
    });

    return (
      <Provider store={store}>
        <CookiesProvider>
          <App />
        </CookiesProvider>
      </Provider>
    );
  }
}
