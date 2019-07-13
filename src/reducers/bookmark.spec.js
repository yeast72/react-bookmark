import reducer, * as bookmarks from "./bookmark";
import * as types from "../constant/actionTypes";

const bookmark1 = {
  id: 1,
  name: "Bookmark 1",
  url: "https://bookmark1.com"
};

const bookmark2 = {
  id: "2",
  name: "Bookmark 2",
  url: "https://bookmark2.com"
};

describe("reducers", () => {
  describe("bookmark", () => {
    const initailState = {
      visibleIds: [],
      byId: {}
    };
    let state;
    it("should provide the initail state", () => {
      expect(reducer(undefined, {})).toEqual(initailState);
    });

    describe("when create bookmark", () => {
      beforeEach(() => {
        state = reducer(state, {
          type: types.CREATE_BOOKMARK,
          bookmark: bookmark1
        });
      });
      it("should handle CREATE_BOOKMARK action", () => {
        expect(bookmarks.getBookmark(state, 1)).toEqual(bookmark1);
      });
    });

    describe("when bookmarks are received", () => {
      beforeEach(() => {
        state = reducer(
          {},
          {
            type: "RECEIVE_BOOKMARKS",
            bookmarks: [
              { id: "1", name: "Bookmark 1", url: "https://bookmark1.com" },
              { id: "2", name: "Bookmark 2", url: "https://bookmark2.com" }
            ]
          }
        );
      });

      it("contains the bookmarks from the action", () => {
        expect(bookmarks.getBookmark(state, 1)).toEqual({
          id: "1",
          name: "Bookmark 1",
          url: "https://bookmark1.com"
        });
        expect(bookmarks.getBookmark(state, 2)).toEqual({
          id: "2",
          name: "Bookmark 2",
          url: "https://bookmark2.com"
        });
      });

      it("contains no other bookmarks", () => {
        expect(bookmarks.getBookmark(state, 3)).toEqual(undefined);
      });

      it("list all of the bookmarks as visible", () => {
        expect(bookmarks.getVisibleBookmark(state)).toEqual([
          { id: "1", name: "Bookmark 1", url: "https://bookmark1.com" },
          { id: "2", name: "Bookmark 2", url: "https://bookmark2.com" }
        ]);
      });
    });
  });
});
