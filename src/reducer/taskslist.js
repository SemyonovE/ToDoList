import { ADD_TASK, DEL_TASK, EDIT_TASK } from "../constants/constants";

const defaultValue = [
  {
    id: "0",
    title: "Sample task",
    text: "This is some task, you need to finished it!",
    importance: "3",
    date: "22 Nov 2018 23:05",
    finished: ""
  }
];

export default (tasklist = loadFromLocalStorage("taskslist"), action) => {
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

function saveToLocalStorage(data, name) {
  return localStorage.setItem(name, JSON.stringify(data));
}

function loadFromLocalStorage(name) {
  if (!localStorage[name]) saveToLocalStorage(defaultValue, name);
  return JSON.parse(localStorage.getItem(name));
}
