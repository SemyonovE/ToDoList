import { combineReducers } from "redux";
import taskslist from "./taskslist";
import setting from "./setting";
import user from "./user";

export default combineReducers({
  taskslist,
  setting,
  user
});
