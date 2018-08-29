import React from "react";
import store from "../store";
import { Provider } from "react-redux";

import MainWrapperApp from "./MainWrapperApp";

export default () => (
  <Provider store={store}>
    <MainWrapperApp />
  </Provider>
);
