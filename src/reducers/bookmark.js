import {
  RECEIVE_BOOKMARKS,
  CREATE_BOOKMARK,
  DELETE_BOOKMARK
} from "../constant/actionTypes";
import { combineReducers } from "redux";

const bookmarks = (state = [], action) => {
  switch (action.type) {
    case DELETE_BOOKMARK:
      return state;
    default:
      return state;
  }
};

const byId = (state = {}, action) => {
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
    default:
      const { bookmarkId } = action;
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
  switch (action.type) {
    case RECEIVE_BOOKMARKS:
      return action.bookmarks.map(bookmark => bookmark.id);
    case CREATE_BOOKMARK:
      return [...state, action.bookmark.id];
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
