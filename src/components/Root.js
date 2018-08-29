import React from "react";
import store from "../store";
import { Provider } from "react-redux";

import { MainWrapperApp } from "./";

const Root = () => (
  <Provider store={store}>
    <MainWrapperApp />
  </Provider>
);

export { Root };
