import {
  ADD_TASK,
  DEL_TASK,
  EDIT_TASK,
  LOAD_TASKLIST
} from "../helpers/constants";

import { loadFromLocalStorage } from "../helpers/workWithStorage";
import { saveToServer } from "../helpers/workWithServer";

export default (tasklist = [{}], action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_TASKLIST:
      return [...payload.tasklist];

    case ADD_TASK:
      let temptask = { ...payload.task };

      // While current id is exist will create new id
      while (tasklist.filter(task => task.id === temptask.id).length !== 0) {
        temptask.id = temptask.id + "0";
      }
      return saveData([...tasklist, temptask]);

    case DEL_TASK:
      return saveData(tasklist.filter(task => task.id !== payload.id));

    case EDIT_TASK:
      return saveData(
        tasklist.map(task => {
          if (task.id === payload.task.id) {
            return payload.task;
          }
          return task;
        })
      );

    default:
      return tasklist;
  }
};

function saveData(list) {
  saveToServer(
    {
      tasks: list,
      email: loadFromLocalStorage("", "userName")
    },
    "tasks"
  );
  return list;
}
