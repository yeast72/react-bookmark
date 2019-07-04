import { combineReducers } from "redux";
import folders, * as fromFolder from "./folder";
import bookmarks, * as fromBookmark from "./bookmark";

export default combineReducers({
  folders,
  bookmarks
});

export const getRootFolder = state => {
  return fromFolder.getFolder(state, "0");
};
