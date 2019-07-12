import {
  TOGGLE_UPDATE_FOLDER_MODAL,
  TOGGLE_ADD_BOOKMARK_MODAL,
  TOGGLE_ADD_FOLDER_MODAL,
  TOGGLE_UPDATE_BOOKMARK_MODAL
} from "../constant/actionTypes";

const initailState = {
  isAddBookmarkModalOpened: false,
  isAddFolderModalOpened: false,
  isUpdateBookmarkModalOpened: false,
  isUpdateFolderModalOpened: false
};

const modals = (state = initailState, action) => {
  switch (action.type) {
    case TOGGLE_ADD_BOOKMARK_MODAL:
      return {
        ...state,
        isAddBookmarkModalOpened: !state.isAddBookmarkModalOpened
      };
    case TOGGLE_ADD_FOLDER_MODAL:
      return {
        ...state,
        isAddFolderModalOpened: !state.isAddFolderModalOpened
      };
    case TOGGLE_UPDATE_BOOKMARK_MODAL:
      return {
        ...state,
        isUpdateBookmarkModalOpened: !state.isUpdateBookmarkModalOpened
      };
    case TOGGLE_UPDATE_FOLDER_MODAL:
      return {
        ...state,
        isUpdateFolderModalOpened: !state.isUpdateFolderModalOpened
      };
    default:
      return state;
  }
};

export default modals;
