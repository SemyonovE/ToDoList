import { ADD_TASK, DEL_TASK, EDIT_TASK } from "../constants/constants";

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
