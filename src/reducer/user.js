import {
  USER_LOG_OUT,
  LOAD_TO_STORE,
  FAILED_LOADING,
  USER_LOADING
} from "../helpers/constants";

export default (status = null, action) => {
  const { type } = action;

  switch (type) {
    case USER_LOADING:
      return { loading: true };
    case LOAD_TO_STORE:
      return { login: true };
    case FAILED_LOADING:
      return null;
    case USER_LOG_OUT:
      return null;
    default:
      return status;
  }
};
