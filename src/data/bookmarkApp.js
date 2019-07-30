const FOLDERS_STORAGE_KEY = "folders";
const BOOKMARKS_STORAGE_KEY = "bookmarks";

export default {
  getFolders: cb =>
    cb(
      JSON.parse(localStorage.getItem(FOLDERS_STORAGE_KEY)) || [
        {
          id: "0",
          name: "Bookmark bars",
          childFolderIds: [],
          bookmarkIds: [],
          orderChildIds: []
        }
      ]
    ),
  getBookmarks: cb =>
    cb(JSON.parse(localStorage.getItem(BOOKMARKS_STORAGE_KEY)) || [])
};

const initialFolder = {
  id: "",
  name: "",
  childFolderIds: [],
  bookmarkIds: [],
  orderChildIds: []
};
