// import { tasks as defaultTaskList } from "../tasks.json";
import { ADD_TASK, DEL_TASK } from "../constants/constants";

export default (tasklist = loadFromLocalStorage('taskslist'), action) => {
  const { type, payload } = action;
  var templist

  switch (type) {
    case ADD_TASK:
      templist = [...tasklist, payload.task]
      saveToLocalStorage(templist, 'taskslist')
      return templist;
    case DEL_TASK:
      templist = tasklist.filter(task => task.id !== payload.id)
      saveToLocalStorage(templist, 'taskslist')
      return templist;
    default:
      return tasklist;
  }
};

function saveToLocalStorage(data, name) {
  return localStorage.setItem(name, JSON.stringify(data))
}

function loadFromLocalStorage(name) {
  if(!localStorage[name]) saveToLocalStorage({}, name)
  return JSON.parse(localStorage.getItem(name))
}
