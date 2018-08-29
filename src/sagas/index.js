import { takeEvery, put, call } from "redux-saga/effects";
import {
  LOAD_FROM_SERVER,
  LOAD_TO_STORE,
  FAILED_LOADING,
  USER_LOADING
} from "../helpers/constants";
import { requestToServer } from "../helpers/workWithServer";
import { settingDefault } from "../helpers/initialParameters";
import { setCookies } from "../helpers/workWithCookies";

function* request({ data, remember }) {
  yield put({ type: USER_LOADING });
  const res = yield call(requestToServer, data);
  // Function what to do when request is success
  if (!res) return yield put({ type: FAILED_LOADING, payload: "Fatal error!" });
  switch (res.status) {
    case "ok":
      remember && setCookies(data);
      // Set data to the store
      return yield put({
        type: LOAD_TO_STORE,
        payload: {
          tasklist: JSON.parse(res.tasks),
          setting: (res.setting && JSON.parse(res.setting)) || settingDefault,
          user: data.email
        }
      });
    case "error":
      return yield put({ type: FAILED_LOADING, payload: res.what });
    default:
      console.log("Wrong answer!");
  }
}

export default function* requestServerSaga() {
  yield takeEvery(LOAD_FROM_SERVER, request);
}
