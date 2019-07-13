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

export const selectFolder = folderId => ({
  type: types.SELECT_FOLDER,
  folderId
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
  type: types.ADD_BOOKMARK_CHILD,
  bookmarkId: bookmarkId,
  folderId: folderId
});

export const addFolder = (childId, folderId) => ({
  type: types.ADD_FOLDER_CHILD,
  childId: childId,
  folderId: folderId
});

export const deleteBookmarkChild = (bookmarkId, folderId) => ({
  type: types.DELETE_BOOKMARK_CHILD,
  bookmarkId: bookmarkId,
  folderId: folderId
});

export const deleteFolder = folderId => ({
  type: types.DELETE_FOLDER,
  folderId: folderId
});

export const deleteFolderChild = (folderId, childId) => ({
  type: types.DELETE_FOLDER_CHILD,
  folderId: folderId,
  childId: childId
});

export const editFolderName = (folderId, name) => ({
  type: types.EDIT_FOLDER_NAME,
  folderId: folderId,
  name: name
});

export const toggleAddFolderModal = () => ({
  type: types.TOGGLE_ADD_FOLDER_MODAL
});

export const toggleAddBookmarkModal = () => ({
  type: types.TOGGLE_ADD_BOOKMARK_MODAL
});

export const toggleUpdateBookmarkModal = () => ({
  type: types.TOGGLE_UPDATE_BOOKMARK_MODAL
});

export const toggleUpdateFolderModal = () => ({
  type: types.TOGGLE_UPDATE_FOLDER_MODAL
});
