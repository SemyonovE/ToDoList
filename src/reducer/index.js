import { combineReducers } from "redux";
import taskslist from "./taskslist";
import language from "./language";

export default combineReducers({
  taskslist,
  language
});
