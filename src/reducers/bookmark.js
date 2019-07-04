import { RECEIVE_BOOKMARKS } from "../constant/actionTypes";
import { combineReducers } from "redux";

const bookmark = (state, action) => {
  switch (action.type) {
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
    default:
      const { bookmarkId } = action;
      if (bookmarkId) {
        return {
          ...state,
          [bookmarkId]: bookmark(state[bookmarkId], action)
        };
      }
      return state;
  }
};

const visibleIds = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_BOOKMARKS:
      return action.bookmarks.map(bookmark => bookmark.id);
    default:
      return state;
  }
};

export default combineReducers({
  byId,
  visibleIds
});

export const getBookmark = (state, id) => state.byId[id];

export const getVisibleBookmark = (state, id) => state.v;
