const FOLDERS_STORAGE_KEY = "folders";
const BOOKMARKS_STORAGE_KEY = "bookmarks";

export default {
  getFolders: cb =>
    cb(JSON.parse(localStorage.getItem(FOLDERS_STORAGE_KEY)) || []),
  getBookmarks: cb =>
    cb(JSON.parse(localStorage.getItem(BOOKMARKS_STORAGE_KEY)) || [])
};
