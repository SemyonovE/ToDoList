import {
  USER_LOG_OUT,
  LOAD_TO_STORE,
  FAILED_LOADING,
  USER_LOADING
} from "../helpers/constants";
import { userDefaultStatus } from "../helpers/initialParameters";
import { saveToLocalStorage } from "../helpers/workWithStorage";

export default (status = userDefaultStatus, { type, payload }) => {
  switch (type) {
    case USER_LOADING:
      return { ...status, loading: true };
    case LOAD_TO_STORE:
      saveToLocalStorage(payload.user, "email");
      return { ...status, loading: false, login: payload.user };
    case FAILED_LOADING:
      return { ...status, loading: false, error: payload };
    case USER_LOG_OUT:
      return userDefaultStatus;
    default:
      return status;
  }
};
