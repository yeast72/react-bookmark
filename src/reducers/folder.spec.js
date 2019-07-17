import * as types from "../constant/actionTypes";
import reducer, * as folders from "./folder";

const initialFolder = {
  id: "",
  name: "",
  childFolderIds: [],
  bookmarkIds: [],
  orderChildIds: []
};

const folder1 = {
  id: 1,
  name: "Folder 1",
  childFolderIds: [],
  bookmarkIds: [],
  orderChildIds: []
};

const folder2 = {
  id: 2,
  name: "Folder 2",
  childFolderIds: [],
  bookmarkIds: [],
  orderChildIds: []
};

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
            folders: [folder1, folder2]
          }
        );
      });

      it("contains the folders from the action", () => {
        expect(folders.getFolder(state, 1)).toEqual(folder1);
        expect(folders.getFolder(state, 2)).toEqual(folder2);
      });

      it("contains no other folders", () => {
        expect(folders.getFolder(state, 3)).toEqual(undefined);
      });

      it("lists all of the folders as visible", () => {
        expect(folders.getVisibleFolders(state)).toEqual([folder1, folder2]);
      });

      describe("when a child folder is added to the folder", () => {
        beforeEach(() => {
          state = reducer(state, {
            type: types.ADD_FOLDER_CHILD,
            childId: 2,
            folderId: 1
          });
        });

        it("should add childFolderId to parent folder and add to orderChildIds", () => {
          expect(folders.getFolder(state, 1)).toEqual({
            ...folder1,
            childFolderIds: [2],
            orderChildIds: [2]
          });
        });
        it("lists all of the folders as visible", () => {
          expect(folders.getVisibleFolders(state)).toEqual([
            {
              ...folder1,
              childFolderIds: [2],
              orderChildIds: [2]
            },
            folder2
          ]);
        });
        test("get child folders test", () => {
          expect(folders.getChildFolder(state, 1)).toEqual([folder2]);
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
              ...folder1,
              childFolderIds: [],
              orderChildIds: []
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
            ...folder1,
            name: "edited folder name"
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
            ...folder1,
            bookmarkIds: [1],
            orderChildIds: [1]
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
              ...folder1,
              bookmarkIds: [],
              orderChildIds: []
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
