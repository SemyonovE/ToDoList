import {
  ADD_TASK,
  DEL_TASK,
  EDIT_TASK,
  TOGGLE_LANG,
  LOAD_TASKLIST
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
