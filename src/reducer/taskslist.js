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
  let templist = [];

  switch (type) {
    case LOAD_TASKLIST:
      templist = [...payload.tasklist];

      break;

    case ADD_TASK:
      let temptask = { ...payload.task };

      // While current id is exist will create new id
      while (tasklist.filter(task => task.id === temptask.id).length !== 0) {
        temptask.id = temptask.id + "0";
      }

      templist = [...tasklist, temptask];

      saveToServer({
        tasks: templist,
        email: loadFromLocalStorage("", "userName")
      });

      break;

    case DEL_TASK:
      templist = tasklist.filter(task => task.id !== payload.id);

      saveToServer({
        tasks: templist,
        email: loadFromLocalStorage("", "userName")
      });

      break;

    case EDIT_TASK:
      templist = tasklist.map(task => {
        if (task.id === payload.task.id) {
          return payload.task;
        }
        return task;
      });

      saveToServer({
        tasks: templist,
        email: loadFromLocalStorage("", "userName")
      });

      break;

    default:
      templist = [...tasklist];
  }

  return templist;
};
