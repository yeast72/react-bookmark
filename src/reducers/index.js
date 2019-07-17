import { combineReducers } from "redux";
import folders, * as fromFolder from "./folder";
import bookmarks, * as fromBookmark from "./bookmark";
import modals from "./modal";

export const getChildFolder = (state, id) => {
  const { folders } = state;
  const bookmarks = getBookmarksFromFolderId(state, id);
  const childFolder = fromFolder.getChildFolder(folders, id);
  return { bookmarks, folders: childFolder };
};

export const getBookmarkItemById = (state, id) => {
  const { folders, bookmarks } = state;
  const folder = fromFolder.getFolder(folders, id);
  const bookmark = fromBookmark.getBookmark(bookmarks, id);
  if (folder) {
    return { type: "folder", folder };
  }
  return { type: "bookmark", bookmark };
};

export const getBookmarkItemlistById = (state, id) => {
  const { folders } = state;
  const folder = fromFolder.getFolder(folders, id);
  return folder.orderChildIds.reduce((obj, id) => {
    let item = getBookmarkItemById(state, id);
    obj[id] = item;
    return obj;
  }, {});
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
  bookmarks,
  modals
});
