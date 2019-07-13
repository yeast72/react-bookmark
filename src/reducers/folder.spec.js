import * as types from "../constant/actionTypes";
import reducer, * as folders from "./folder";

describe("reducers", () => {
  describe("folder", () => {
    let state;

    it("should return the initail state when no action passed", () => {
      expect(reducer(undefined, {})).toEqual({
        byId: {},
        selectedFolderId: "",
        visibleFolderIds: []
      });
    });

    describe("when folders are received", () => {
      beforeEach(() => {
        state = reducer(
          {},
          {
            type: types.RECEIVE_FOLDERS,
            folders: [
              {
                id: 1,
                name: "Folder 1",
                childFolderIds: [],
                bookmarkIds: []
              },
              {
                id: 2,
                name: "Folder 2",
                childFolderIds: [],
                bookmarkIds: []
              }
            ]
          }
        );
      });

      it("contains the folders from the action", () => {
        expect(folders.getFolder(state, 1)).toEqual({
          id: 1,
          name: "Folder 1",
          childFolderIds: [],
          bookmarkIds: []
        });
        expect(folders.getFolder(state, 2)).toEqual({
          id: 2,
          name: "Folder 2",
          childFolderIds: [],
          bookmarkIds: []
        });
      });

      it("contains no other folders", () => {
        expect(folders.getFolder(state, 3)).toEqual(undefined);
      });

      it("lists all of the folders as visible", () => {
        expect(folders.getVisibleFolders(state)).toEqual([
          {
            id: 1,
            name: "Folder 1",
            childFolderIds: [],
            bookmarkIds: []
          },
          {
            id: 2,
            name: "Folder 2",
            childFolderIds: [],
            bookmarkIds: []
          }
        ]);
      });

      describe("when a child folder is added to the folder", () => {
        beforeEach(() => {
          state = reducer(state, {
            type: types.ADD_FOLDER_CHILD,
            childId: 2,
            folderId: 1
          });
        });

        it("should add childFolderId to parent folder", () => {
          expect(folders.getFolder(state, 1)).toEqual({
            id: 1,
            name: "Folder 1",
            childFolderIds: [2],
            bookmarkIds: []
          });
        });
        it("lists all of the folders as visible", () => {
          expect(folders.getVisibleFolders(state)).toEqual([
            {
              id: 1,
              name: "Folder 1",
              childFolderIds: [2],
              bookmarkIds: []
            },
            {
              id: 2,
              name: "Folder 2",
              childFolderIds: [],
              bookmarkIds: []
            }
          ]);
        });

        describe("when deleted folder", () => {
          beforeEach(() => {
            state = reducer(state, {
              type: types.DELETE_FOLDER_CHILD,
              folderId: 1,
              childId: 2
            });

            state = reducer(state, {
              type: types.DELETE_FOLDER,
              folderId: 2
            });
          });

          it("should remove child id in parant folder", () => {
            expect(folders.getFolder(state, 1)).toEqual({
              id: 1,
              name: "Folder 1",
              childFolderIds: [],
              bookmarkIds: []
            });
          });

          it("should delete folder", () => {
            expect(folders.getFolder(state, 2)).toEqual(undefined);
          });
        });
      });

      describe("when edit folder name", () => {
        beforeEach(() => {
          state = reducer(state, {
            type: types.EDIT_FOLDER_NAME,
            folderId: 1,
            name: "edited folder name"
          });
        });

        it("should edit folder name", () => {
          expect(folders.getFolder(state, 1)).toEqual({
            id: 1,
            name: "edited folder name",
            childFolderIds: [],
            bookmarkIds: []
          });
        });
      });

      describe("when a bookmark id is added to the folder", () => {
        beforeEach(() => {
          state = reducer(state, {
            type: types.ADD_BOOKMARK_CHILD,
            bookmarkId: 1,
            folderId: 1
          });
        });

        it("should add bookmark id to folder", () => {
          expect(folders.getFolder(state, 1)).toEqual({
            id: 1,
            name: "Folder 1",
            childFolderIds: [],
            bookmarkIds: [1]
          });
        });

        describe("when a bookmark deleted", () => {
          beforeEach(() => {
            state = reducer(state, {
              type: types.DELETE_BOOKMARK_CHILD,
              bookmarkId: 1,
              folderId: 1
            });
          });

          it("should delete bookmark id in folder bookmarkIds", () => {
            expect(folders.getFolder(state, 1)).toEqual({
              id: 1,
              name: "Folder 1",
              childFolderIds: [],
              bookmarkIds: []
            });
          });
        });
      });
    });

    describe("when a folder is created", () => {
      beforeEach(() => {
        state = reducer(
          {},
          {
            type: types.CREATE_FOLDER,
            folder: {
              id: 1,
              name: "Folder 1",
              childFolderIds: [],
              bookmarkIds: []
            }
          }
        );
      });

      it("should created folder", () => {
        expect(folders.getFolder(state, 1)).toEqual({
          id: 1,
          name: "Folder 1",
          childFolderIds: [],
          bookmarkIds: []
        });
      });

      it("contain no other folder", () => {
        expect(folders.getFolder(state, 2)).toEqual(undefined);
      });

      it("lists all of the folders as visible", () => {
        expect(folders.getVisibleFolders(state)).toEqual([
          { id: 1, name: "Folder 1", childFolderIds: [], bookmarkIds: [] }
        ]);
      });
    });
  });
});
