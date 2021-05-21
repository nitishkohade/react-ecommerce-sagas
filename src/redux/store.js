import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import rootReducer from "./root-reducer";
import {persistStore} from 'redux-persist'
// thunk and saga are both used for handling async operations
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
// import { fetchCollectionsStart } from "./shop/shop.sagas";
import rootSaga from "./root-saga";

const sagaMiddleware = createSagaMiddleware()

const middlewares = [logger, thunk, sagaMiddleware]

export const store = createStore(rootReducer, applyMiddleware(...middlewares))

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)

export default {store, persistor}