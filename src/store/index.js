import { createStore, compose, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import rootReducer from "../reducers";

import thunk from "redux-thunk";
import loggerMiddleware from "../middleware/logger";
import monitorReducerEnhancer from "../enhancers/monitorReducer";

const middlewareEnhancer = applyMiddleware(loggerMiddleware, thunk);
const composedEnhancers = compose(
  middlewareEnhancer,
  monitorReducerEnhancer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const persistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ["modal", "activeBookmarkId"]
};

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(pReducer, composedEnhancers);
export const persistor = persistStore(store);
