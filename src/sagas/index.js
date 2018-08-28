import { takeEvery, put } from "redux-saga/effects";
import {
  LOAD_FROM_SERVER,
  LOAD_TO_STORE,
  FAILED_LOADING,
  USER_LOADING
} from "../helpers/constants";
import { requestToServer } from "../helpers/workWithServer";
import { settingDefault } from "../helpers/initialParameters";
import { saveToLocalStorage } from "../helpers/workWithStorage";

function* request({ data }) {
  yield put({ type: USER_LOADING });
  const res = yield requestToServer(data);
  // Function what to do when request is success

  if (res) {
    // Set name of the user
    saveToLocalStorage(data.email, "userName");

    // Set data to the store
    yield put({
      type: LOAD_TO_STORE,
      payload: {
        tasklist: JSON.parse(res.tasks),
        setting: (res.setting && JSON.parse(res.setting)) || settingDefault
      }
    });
  } else {
    yield put({ type: FAILED_LOADING });
  }
}

export default function* requestServerSaga() {
  yield takeEvery(LOAD_FROM_SERVER, request);
}
