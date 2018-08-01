import { ADD_TASK, DEL_TASK } from "../constants/constants";

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
