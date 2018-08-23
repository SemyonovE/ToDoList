import { combineReducers } from "redux";
import taskslist from "./taskslist";
import setting from "./setting";

export default combineReducers({
  taskslist,
  setting
});
