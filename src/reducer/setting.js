import {
  CHANGE_FILTER,
  CHANGE_SORTER,
  CHANGE_DISPLAYMODE,
  CHANGE_TASKLIST_STYLE,
  CHANGE_TAB_INDEX_DEFAULT,
  LOAD_SETTING
} from "../helpers/constants";
import { saveToServer } from "../helpers/workWithServer";

import { settingDefault } from "../helpers/initialParameters";

export default (setting = settingDefault, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_SETTING:
      return { ...payload.setting };

    case CHANGE_FILTER:
      return saveToServer(
        { ...setting, filterKey: payload.filterKey },
        "setting"
      );

    case CHANGE_SORTER:
      return saveToServer(
        { ...setting, sorterMode: payload.sorterMode },
        "setting"
      );

    case CHANGE_DISPLAYMODE:
      return saveToServer(
        { ...setting, displayMode: payload.displayMode },
        "setting"
      );

    case CHANGE_TASKLIST_STYLE:
      return saveToServer(
        { ...setting, tasklistStyle: payload.tasklistStyle },
        "setting"
      );

    case CHANGE_TAB_INDEX_DEFAULT:
      return saveToServer(
        { ...setting, tabIndexDefault: payload.tabIndexDefault },
        "setting"
      );

    default:
      return setting;
  }
};
