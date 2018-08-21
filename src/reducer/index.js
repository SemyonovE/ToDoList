import { combineReducers } from "redux";
import taskslist from "./taskslist";
import language from "./language";
import setting from "./setting";

export default combineReducers({
  taskslist,
  language,
  setting
});
