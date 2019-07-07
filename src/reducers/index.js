import { combineReducers } from "redux";
import folders, * as fromFolder from "./folder";
import bookmarks, * as fromBookmark from "./bookmark";
import { SELECT_FOLDER, RECEIVE_BOOKMARKS } from "../constant/actionTypes";

export const getChildFolder = (state, id) => {
  const { folders } = state;
  const bookmarks = getBookmarksFromFolderId(state, id);
  const childFolder = fromFolder.getChildFolder(folders, id);
  return { bookmarks, folders: childFolder };
};

export const getBookmarksFromFolderId = (state, id) => {
  const { folders, bookmarks } = state;
  const bookmarkIds = fromFolder.getFolder(folders, id).bookmarkIds;
  return bookmarkIds.map(id => fromBookmark.getBookmark(bookmarks, id));
};

export const getRootFolder = state => {
  const { folders } = state;
  return fromFolder.getFolder(folders, "0");
};

export default combineReducers({
  folders,
  bookmarks
});
