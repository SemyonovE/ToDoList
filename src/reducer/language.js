import { TOGGLE_LANG } from "../helpers/constants";
import {
  saveToLocalStorage,
  loadFromLocalStorage
} from "../helpers/workWithStorage";

import { LANG } from "../helpers/dictionary";

export default (
  language = LANG[loadFromLocalStorage("en", "language")],
  action
) => {
  const { type, payload } = action;

  if (type === TOGGLE_LANG) {
    saveToLocalStorage(payload.language, "language");

    return LANG[payload.language];
  }

  return language;
};
