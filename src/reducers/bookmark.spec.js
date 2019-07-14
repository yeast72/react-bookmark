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
    let state = {};
    it("should provide the initail state", () => {
      expect(reducer(undefined, {})).toEqual(initailState);
    });

    describe("when create bookmark", () => {
      beforeEach(() => {
        state = reducer(
          {},
          {
            type: types.CREATE_BOOKMARK,
            bookmark: bookmark1
          }
        );
      });
      it("should handle CREATE_BOOKMARK action", () => {
        expect(bookmarks.getBookmark(state, 1)).toEqual(bookmark1);
      });
      it("contain no other bookmark", () => {
        expect(bookmarks.getVisibleBookmark(state)).toEqual([bookmark1]);
      });
    });

    describe("when bookmarks are received", () => {
      beforeEach(() => {
        state = reducer(
          {},
          {
            type: "RECEIVE_BOOKMARKS",
            bookmarks: [bookmark1, bookmark2]
          }
        );
      });

      it("contains the bookmarks from the action", () => {
        expect(bookmarks.getBookmark(state, 1)).toEqual(bookmark1);
        expect(bookmarks.getBookmark(state, 2)).toEqual(bookmark2);
      });

      it("contains no other bookmarks", () => {
        expect(bookmarks.getBookmark(state, 3)).toEqual(undefined);
      });

      it("list all of the bookmarks as visible", () => {
        expect(bookmarks.getVisibleBookmark(state)).toEqual([
          bookmark1,
          bookmark2
        ]);
      });

      describe("when delete bookmark", () => {
        beforeEach(() => {
          state = reducer(state, {
            type: types.DELETE_BOOKMARK,
            bookmarkId: 2
          });
        });

        it("should delete bookmark", () => {
          expect(bookmarks.getBookmark(state, 2)).toEqual(undefined);
        });
        it("list all of the bookmarks as visible", () => {
          expect(bookmarks.getVisibleBookmark(state)).toEqual([bookmark1]);
        });
      });

      describe("when edit bookmark name and url", () => {
        beforeEach(() => {
          state = reducer(state, {
            type: types.EDIT_BOOKMARK,
            bookmarkId: 1,
            name: "edited bookmark name",
            url: "https://editedbookmark.com"
          });
        });

        it("should edit bookmark name and url", () => {
          expect(bookmarks.getBookmark(state, 1)).toEqual({
            id: 1,
            name: "edited bookmark name",
            url: "https://editedbookmark.com"
          });
        });

        it("should not edit other bookmark", () => {
          expect(bookmarks.getBookmark(state, 2)).toEqual(bookmark2);
        });
      });
    });
  });
});
