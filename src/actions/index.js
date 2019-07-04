import uuid from "uuid/v1";
import * as types from "../constant/actionTypes";
import bookmarkApp from "../data/bookmarkApp";

const receiveFolders = folders => ({
  type: types.RECEIVE_FOLDERS,
  folders
});

const receiveBookmarks = bookmarks => ({
  type: types.RECEIVE_BOOKMARKS,
  bookmarks
});

export const getAllFolders = () => dispatch => {
  bookmarkApp.getFolders(folders => {
    dispatch(receiveFolders(folders));
  });
};

export const getAllBookmarks = () => dispatch => {
  bookmarkApp.getBookmarks(bookmarks => {
    dispatch(receiveBookmarks(bookmarks));
  });
};

export const createBookmark = bookmark => ({
  type: types.CREATE_BOOKMARK,
  bookmark: bookmark
});

export const createFolder = folder => ({
  type: types.CREATE_FOLDER,
  folder
});

export const addBookmark = (bookmarkId, folderId) => ({
  type: types.ADD_BOOKMARK,
  folderId: folderId,
  bookmarkId: bookmarkId
});

export const addFolder = (parentId, folderId) => ({
  type: types.ADD_FOLDER,
  parentId: parentId,
  folderId: folderId
});
