import { combineReducers } from "redux";

import {
  ADD_BOOKMARK_CHILD,
  CREATE_FOLDER,
  ADD_FOLDER_CHILD,
  DELETE_BOOKMARK_CHILD,
  DELETE_FOLDER_CHILD,
  RECEIVE_FOLDERS,
  DELETE_FOLDER,
  SELECT_FOLDER,
  EDIT_FOLDER_NAME
} from "../constant/actionTypes";

const initialFolder = {
  id: "0",
  name: "Bookmark Bar",
  childFolderIds: [],
  bookmarkIds: [],
  orderChildIds: []
};

const initailById = {
  "0": initialFolder
};

const initVisibleId = [0];

const orderChildIds = (state = [], action) => {
  switch (action.type) {
    case ADD_FOLDER_CHILD:
      return [...state, action.childId];
    case DELETE_FOLDER_CHILD:
      return state.filter(id => id.toString() !== action.childId.toString());
    case ADD_BOOKMARK_CHILD:
      return [...state, action.bookmarkId];
    case DELETE_BOOKMARK_CHILD:
      return state.filter(id => id.toString() !== action.bookmarkId.toString());
    default:
      return state;
  }
};

const childFolderIds = (state = [], action) => {
  switch (action.type) {
    case ADD_FOLDER_CHILD:
      return [...state, action.childId];
    case DELETE_FOLDER_CHILD:
      return state.filter(id => id.toString() !== action.childId.toString());
    default:
      return state;
  }
};

const bookmarkIds = (state = [], action) => {
  switch (action.type) {
    case ADD_BOOKMARK_CHILD:
      return [...state, action.bookmarkId];
    case DELETE_BOOKMARK_CHILD:
      return state.filter(id => id.toString() !== action.bookmarkId.toString());
    default:
      return state;
  }
};

const folders = (state = initialFolder, action) => {
  switch (action.type) {
    case CREATE_FOLDER:
      return {
        ...action.folder,
        bookmarkIds: bookmarkIds(state.bookmarkIds, action),
        childFolderIds: childFolderIds(state.childFolderIds, action),
        orderChildIds: orderChildIds(state.orderChildIds, action)
      };
    case ADD_FOLDER_CHILD:
    case DELETE_FOLDER_CHILD:
      return {
        ...state,
        childFolderIds: childFolderIds(state.childFolderIds, action),
        orderChildIds: orderChildIds(state.orderChildIds, action)
      };
    case ADD_BOOKMARK_CHILD:
    case DELETE_BOOKMARK_CHILD:
      return {
        ...state,
        bookmarkIds: bookmarkIds(state.bookmarkIds, action),
        orderChildIds: orderChildIds(state.orderChildIds, action)
      };
    case EDIT_FOLDER_NAME:
      return {
        ...state,
        name: action.name
      };
    default:
      return state;
  }
};

const byId = (state = initailById, action) => {
  const { folderId } = action;
  switch (action.type) {
    case RECEIVE_FOLDERS:
      return {
        ...state,
        ...action.folders.reduce((obj, folder) => {
          obj[folder.id] = folder;
          return obj;
        }, {})
      };
    case CREATE_FOLDER:
      const { folder } = action;
      return {
        ...state,
        [folder.id]: folders(action.folder, action)
      };
    case DELETE_FOLDER:
      const descendantIds = getAllDescendantIds(state, folderId);
      return deleteMany(state, [folderId, ...descendantIds]);
    default:
      if (folderId) {
        return {
          ...state,
          [folderId]: folders(state[folderId], action)
        };
      }
      return state;
  }
};

const visibleFolderIds = (state = initVisibleId, action) => {
  switch (action.type) {
    case RECEIVE_FOLDERS:
      return action.folders.map(folder => folder.id);
    case CREATE_FOLDER:
      const folderId = action.folder.id;
      return [...state, folderId];
    default:
      return state;
  }
};

const selectedFolderId = (state = "0", action) => {
  switch (action.type) {
    case RECEIVE_FOLDERS:
      return "0";
    case SELECT_FOLDER:
      return action.folderId;
    default:
      return state;
  }
};

export default combineReducers({
  byId,
  visibleFolderIds,
  selectedFolderId
});

const getAllDescendantIds = (state, folderId) =>
  state[folderId].childFolderIds.reduce(
    (acc, childId) => [...acc, childId, ...getAllDescendantIds(state, childId)],
    []
  );

const deleteMany = (state, folderId) => {
  state = { ...state };
  folderId.forEach(id => delete state[id]);
  return state;
};

export const getChildFolder = (state, id) => {
  const { childFolderIds } = getFolder(state, id);
  return childFolderIds.map(childId => getFolder(state, childId));
};

export const getFolder = (state, id) => {
  return state.byId[id];
};

export const getVisibleFolders = state =>
  state.visibleFolderIds.map(id => getFolder(state, id));
