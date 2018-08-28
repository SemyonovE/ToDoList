import { USER_LOG_OUT, LOAD_FROM_SERVER } from "../helpers/constants";

export default (status = false, action) => {
  const { type } = action;

  switch (type) {
    case LOAD_FROM_SERVER:
      return true;
    case USER_LOG_OUT:
      return false;
    default:
      return status;
  }
};
