import { combineReducers } from "redux";

import {
  ADD_FOLDER,
  CREATE_FOLDER,
  ADD_FOLDER_CHILD,
  REMOVE_FOLDER_CHILD,
  RECEIVE_FOLDERS,
  DELETE_FOLDER
} from "../constant/actionTypes";

const childFolderIds = (state, action) => {
  switch (action.type) {
    case ADD_FOLDER_CHILD:
      return [...state, action.childId];
    case REMOVE_FOLDER_CHILD:
      return state.filter(id => id !== action.childId);
    default:
      return state;
  }
};

const folder = (state, action) => {
  switch (action.type) {
    case CREATE_FOLDER:
      return {
        folder: action.folder
      };
    case ADD_FOLDER_CHILD:
    case REMOVE_FOLDER_CHILD:
      return {
        ...state,
        childFolderIds: childFolderIds(state.childFolderIds, action)
      };
    default:
      return state;
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_FOLDERS:
      return {
        ...state,
        ...action.folders.reduce((obj, folder) => {
          obj[folder.id] = folder;
          return obj;
        }, {})
      };
    default:
      const { folderId } = action;
      if (folderId) {
        return {
          ...state,
          [folderId]: folder(state[folderId], action)
        };
      }
      return state;
  }
};

const visibleFolderIds = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_FOLDERS:
      return action.folders.map(folder => folder.id);
    default:
      return state;
  }
};

export default combineReducers({
  byId,
  visibleFolderIds
});

export const getFolder = (state, id) => state.byId[id];

export const getVisibleFolders = state =>
  state.visibleFolderIds.map(id => getFolder(state, id));
