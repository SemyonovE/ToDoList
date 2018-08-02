import { ADD_TASK, DEL_TASK, EDIT_TASK } from "../helpers/constants";
import {
  saveToLocalStorage,
  loadFromLocalStorage
} from "../helpers/workWithStorage";

const sampleTaskDate =
  "22 Nov " +
  (new Date().getFullYear() +
    (Date.parse("22 Nov 2018 23:05") < new Date() ? 1 : 0)) +
  " 23:05";

const defaultValue = [
  {
    id: "0",
    title: "Sample task",
    text: "Do not forget to congratulate the author on his birthday!",
    importance: "3",
    date: sampleTaskDate,
    finished: ""
  }
];

export default (
  tasklist = loadFromLocalStorage(defaultValue, "taskslist"),
  action
) => {
  const { type, payload } = action;
  let templist = [];

  switch (type) {
    case ADD_TASK:
      let temptask = { ...payload.task };
      while (tasklist.filter(task => task.id === temptask.id).length !== 0) {
        temptask.id = temptask.id + "0";
      }
      templist = [...tasklist, temptask];
      saveToLocalStorage(templist, "taskslist");
      break;

    case DEL_TASK:
      templist = tasklist.filter(task => task.id !== payload.id);
      saveToLocalStorage(templist, "taskslist");
      break;

    case EDIT_TASK:
      templist = tasklist.map(task => {
        if (task.id === payload.task.id) {
          return payload.task;
        }
        return task;
      });
      saveToLocalStorage(templist, "taskslist");
      break;

    default:
      templist = [...tasklist];
  }

  return templist;
};
