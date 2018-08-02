import React from "react";
import store from "../store";
import { Provider } from "react-redux";

import App from "./App";

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}