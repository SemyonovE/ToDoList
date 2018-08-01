import { tasks as defaultTaskList } from "../tasks.json";
import { ADD_TASK, DEL_TASK } from "../constants/constants";

export default (tasklist = defaultTaskList, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_TASK:
      return [...tasklist, payload.task];
    case DEL_TASK:
      return tasklist.filter(task => task.id !== payload.id);
    default:
      return tasklist;
  }
};
