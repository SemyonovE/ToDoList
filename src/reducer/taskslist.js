// import { tasks as defaultTaskList } from "../tasks.json";
import { ADD_TASK, DEL_TASK, EDIT_TASK } from "../constants/constants";

export default (tasklist = loadFromLocalStorage('taskslist'), action) => {
  const { type, payload } = action;
  var templist

  switch (type) {
    case ADD_TASK:
      let temptask = {...payload.task}
      while(tasklist.filter(task => task.id === temptask.id).length !== 0) {
        temptask.id = temptask.id + "0"
      }
      templist = [...tasklist, temptask]
      saveToLocalStorage(templist, 'taskslist')
      return templist;
    case DEL_TASK:
      templist = tasklist.filter(task => task.id !== payload.id)
      saveToLocalStorage(templist, 'taskslist')
      return templist;
    case EDIT_TASK:
      templist = tasklist.map(task => {
        if(task.id === payload.task.id) {
          return payload.task
        }
        return task
      })
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
  if(!localStorage[name]) saveToLocalStorage([{
    id: "0",
    title: "Sample task",
    text: "This is some task, you need to finished it!",
    importance: "3",
    date: "22 Nov 2018 23:05",
    finished: ""
  }], name)
  return JSON.parse(localStorage.getItem(name))
}
