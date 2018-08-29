import {
  ADD_TASK,
  DEL_TASK,
  EDIT_TASK,
  LOAD_FROM_SERVER,
  CHANGE_FILTER,
  CHANGE_SORTER,
  CHANGE_COLOR_STYLE,
  CHANGE_DEFINE_HEADER,
  CHANGE_DISPLAY_MODE,
  CHANGE_TASKLIST_STYLE,
  CHANGE_TAB_INDEX_DEFAULT,
  USER_LOG_OUT,
  CHANGE_LANGUAGE
} from "../helpers/constants";

// For tasklist

export const addTask = task => ({
  type: ADD_TASK,
  payload: { task }
});

export const deleteTask = id => ({
  type: DEL_TASK,
  payload: { id }
});

export const editTask = task => ({
  type: EDIT_TASK,
  payload: { task }
});

// For Saga

export const loadingFromServer = (data, remember) => ({
  type: LOAD_FROM_SERVER,
  data,
  remember
});

// For settings

export const changeFilter = filterKey => ({
  type: CHANGE_FILTER,
  payload: { filterKey }
});

export const changeSorter = sorterMode => ({
  type: CHANGE_SORTER,
  payload: { sorterMode }
});

export const changeColorStyle = color => ({
  type: CHANGE_COLOR_STYLE,
  payload: { color }
});

export const changeDefineHeader = header => ({
  type: CHANGE_DEFINE_HEADER,
  payload: { header }
});

export const changeDisplayMode = displayMode => ({
  type: CHANGE_DISPLAY_MODE,
  payload: { displayMode }
});

export const changeTasklistStyle = tasklistStyle => ({
  type: CHANGE_TASKLIST_STYLE,
  payload: { tasklistStyle }
});

export const changeTabIndexDefault = tabIndexDefault => ({
  type: CHANGE_TAB_INDEX_DEFAULT,
  payload: { tabIndexDefault }
});

export const changeLanguage = () => ({
  type: CHANGE_LANGUAGE
});

// For user

export const userLogOut = () => ({ type: USER_LOG_OUT });
