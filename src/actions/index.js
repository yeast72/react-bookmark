import * as types from "../constant/actionTypes";
import bookmarkApp from "../data/bookmarkApp";

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

export const selectBookmark = id => ({
  type: types.SELECT_BOOKMARK,
  id
});

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

export const deleteBookmark = bookmarkId => ({
  type: types.DELETE_BOOKMARK,
  bookmarkId: bookmarkId
});

export const deleteFolder = folderId => ({
  type: types.DELETE_FOLDER,
  folderId: folderId
});

export const deleteFolderChild = (childId, folderId) => ({
  type: types.DELETE_FOLDER_CHILD,
  childId: childId,
  folderId: folderId
});

export const deleteBookmarkChild = (bookmarkId, folderId) => ({
  type: types.DELETE_BOOKMARK_CHILD,
  bookmarkId: bookmarkId,
  folderId: folderId
});

export const editFolderName = (folderId, name) => ({
  type: types.EDIT_FOLDER_NAME,
  folderId: folderId,
  name: name
});

export const editBookmark = (bookmarkId, name, url) => ({
  type: types.EDIT_BOOKMARK,
  bookmarkId: bookmarkId,
  name: name,
  url: url
});

export const showModal = (modalType, modalProps) => ({
  type: types.SHOW_MODAL,
  modalType: modalType,
  modalProps: modalProps
});

export const hideModal = () => ({
  type: types.HIDE_MODAL
});
