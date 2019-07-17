import {
  RECEIVE_BOOKMARKS,
  CREATE_BOOKMARK,
  DELETE_BOOKMARK,
  EDIT_BOOKMARK
} from "../constant/actionTypes";
import { combineReducers } from "redux";

const bookmarks = (state = {}, action) => {
  switch (action.type) {
    case EDIT_BOOKMARK:
      return { ...state, name: action.name, url: action.url };
    default:
      return state;
  }
};

const byId = (state = {}, action) => {
  const { bookmarkId } = action;
  switch (action.type) {
    case RECEIVE_BOOKMARKS:
      return {
        ...state,
        ...action.bookmarks.reduce((obj, bookmark) => {
          obj[bookmark.id] = bookmark;
          return obj;
        }, {})
      };
    case CREATE_BOOKMARK:
      const { bookmark } = action;
      return {
        ...state,
        [bookmark.id]: bookmark
      };
    case DELETE_BOOKMARK:
      delete state[bookmarkId];
      return {
        ...state
      };
    default:
      if (bookmarkId) {
        return {
          ...state,
          [bookmarkId]: bookmarks(state[bookmarkId], action)
        };
      }
      return state;
  }
};

const visibleIds = (state = [], action) => {
  const { bookmarkId } = action;
  switch (action.type) {
    case RECEIVE_BOOKMARKS:
      return action.bookmarks.map(bookmark => bookmark.id);
    case CREATE_BOOKMARK:
      return [...state, action.bookmark.id];
    case DELETE_BOOKMARK:
      return state.filter(id => id !== bookmarkId);
    default:
      return state;
  }
};

export default combineReducers({
  byId,
  visibleIds
});

export const getBookmark = (state, id) => state.byId[id];

export const getVisibleBookmark = state =>
  state.visibleIds.map(id => getBookmark(state, id));
