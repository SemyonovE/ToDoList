import {
  ADD_TASK,
  DEL_TASK,
  EDIT_TASK,
  TOGGLE_LANG,
  LOAD_TASKLIST,
  LOAD_SETTING,
  CHANGE_FILTER,
  CHANGE_SORTER,
  CHANGE_DISPLAYMODE,
  CHANGE_TASKLIST_STYLE,
  CHANGE_TAB_INDEX_DEFAULT
} from "../helpers/constants";

export function addTask(task) {
  return {
    type: ADD_TASK,
    payload: { task }
  };
}

export function deleteTask(id) {
  return {
    type: DEL_TASK,
    payload: { id }
  };
}

export function editTask(task) {
  return {
    type: EDIT_TASK,
    payload: { task }
  };
}

export function toggleLanguage(language) {
  return {
    type: TOGGLE_LANG,
    payload: { language }
  };
}

export function loadTasklist(tasklist) {
  return {
    type: LOAD_TASKLIST,
    payload: { tasklist }
  };
}

export function changeFilter(filterKey) {
  return {
    type: CHANGE_FILTER,
    payload: { filterKey }
  };
}

export function changeSorter(sorterMode) {
  return {
    type: CHANGE_SORTER,
    payload: { sorterMode }
  };
}

export function changeDisplayMode(displayMode) {
  return {
    type: CHANGE_DISPLAYMODE,
    payload: { displayMode }
  };
}

export function changeTasklistStyle(tasklistStyle) {
  return {
    type: CHANGE_TASKLIST_STYLE,
    payload: { tasklistStyle }
  };
}

export function changeTabIndexDefault(tabIndexDefault) {
  return {
    type: CHANGE_TAB_INDEX_DEFAULT,
    payload: { tabIndexDefault }
  };
}

export function loadSetting(setting) {
  return {
    type: LOAD_SETTING,
    payload: { setting }
  };
}
