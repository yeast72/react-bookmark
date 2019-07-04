import React from "react";
import ReactDOM from "react-dom";
import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import reducer from "./reducers";
import { getAllFolders, getAllBookmarks } from "./actions";

import App from "./containers/App";

import "./index.css";

const middleware = [thunk];

const store = createStore(
  reducer /* preloadedState, */,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

store.dispatch(getAllFolders());
store.dispatch(getAllBookmarks());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById("root")
);
