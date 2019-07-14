import reducer from "./modal";
import * as types from "../constant/actionTypes";

const initailState = {
  isAddBookmarkModalOpened: false,
  isAddFolderModalOpened: false,
  isUpdateBookmarkModalOpened: false,
  isUpdateFolderModalOpened: false
};

describe("reducer", () => {
  describe("modal", () => {
    let state;
    it("should initial modal state", () => {
      expect(reducer(undefined, {})).toEqual(initailState);
    });

    it("should change add bookmark modal state when toggle add boomark modal", () => {
      expect(reducer(state, { type: types.TOGGLE_ADD_BOOKMARK_MODAL })).toEqual(
        {
          ...initailState,
          isAddBookmarkModalOpened: true
        }
      );
    });

    it("should change add folder modal state when toggle add folder modal", () => {
      expect(reducer(state, { type: types.TOGGLE_ADD_FOLDER_MODAL })).toEqual({
        ...initailState,
        isAddFolderModalOpened: true
      });
    });
    it("should change update bookmark modal state when toggle update bookmark modal", () => {
      expect(
        reducer(state, { type: types.TOGGLE_UPDATE_BOOKMARK_MODAL })
      ).toEqual({
        ...initailState,
        isUpdateBookmarkModalOpened: true
      });
    });
    it("should change update folder modal state when toggle update folder modal", () => {
      expect(
        reducer(state, { type: types.TOGGLE_UPDATE_FOLDER_MODAL })
      ).toEqual({
        ...initailState,
        isUpdateFolderModalOpened: true
      });
    });
  });
});
