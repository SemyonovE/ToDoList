import {
  CHANGE_FILTER,
  CHANGE_SORTER,
  CHANGE_DISPLAY_MODE,
  CHANGE_TASKLIST_STYLE,
  CHANGE_TAB_INDEX_DEFAULT,
  CHANGE_COLOR_STYLE,
  LOAD_SETTING,
  CHANGE_DEFINE_HEADER
} from "../helpers/constants";
import { saveData } from "../helpers/workWithServer";
import { settingDefault } from "../helpers/initialParameters";

export default (setting = settingDefault, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_SETTING:
      return { ...setting, ...payload.setting };

    case CHANGE_FILTER:
      return save({ ...setting, filterKey: payload.filterKey });

    case CHANGE_SORTER:
      return save({ ...setting, sorterMode: payload.sorterMode });

    case CHANGE_DISPLAY_MODE:
      return save({ ...setting, displayMode: payload.displayMode });

    case CHANGE_TASKLIST_STYLE:
      return save({ ...setting, tasklistStyle: payload.tasklistStyle });

    case CHANGE_TAB_INDEX_DEFAULT:
      return save({ ...setting, tabIndexDefault: payload.tabIndexDefault });

    case CHANGE_DEFINE_HEADER:
      return save({ ...setting, defineHeader: payload.defineHeader });

    case CHANGE_COLOR_STYLE:
      return save({ ...setting, colorStyle: payload.color });

    default:
      return setting;
  }
};

const save = list => saveData(list, "setting");
