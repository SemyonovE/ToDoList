import React from "react";
import store from "../store";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import { Provider as CtxProvider } from "../context";

import moment from "moment";
import "moment/locale/ru";

import App from "./App";

import {
  loadFromLocalStorage,
  saveToLocalStorage
} from "../helpers/workWithStorage";
import LANG from "../helpers/dictionary";

const momentSetting = { week: { dow: 1 } };

export default class Root extends React.Component {
  state = ((layout = loadFromLocalStorage("ru", "language")) => ({
    lang: layout,
    LANG: LANG[layout],
    toggleLanguage: () =>
      this.setState(pS => {
        const currentLang = pS.lang === "en" ? "ru" : "en";
        saveToLocalStorage(currentLang, "language");
        return { lang: currentLang, LANG: LANG[currentLang] };
      })
  }))();

  render = ({ lang } = this.state) => {
    moment.updateLocale(lang, momentSetting);

    return (
      <Provider store={store}>
        <CookiesProvider>
          <CtxProvider value={this.state}>
            <App />
          </CtxProvider>
        </CookiesProvider>
      </Provider>
    );
  };
}
