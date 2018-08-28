import { createStore, applyMiddleware } from "redux";
import reducer from "../reducer";

import createSagaWiddleware from "redux-saga";
import requestServerSaga from "../sagas";

const sagaMiddleware = createSagaWiddleware();

export default createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(requestServerSaga);
