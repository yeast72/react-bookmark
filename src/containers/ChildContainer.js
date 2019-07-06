import React from "react";
import { connect } from "react-redux";
import { getChildFolder, getBookmarksFromFolderId } from "../reducers";
import ChildsList from "../components/Child/ChildsList";
import ChildFolderItem from "../components/Child/ChildFolderItem";
import ChildBookmarkItem from "../components/Child/ChildBookmarkItem";

const ChildContainer = ({ child }) => {
  const { folders, bookmarks } = child;

  const renderChildFolder = folders.map(folder => {
    return (
      <li key={folder.id}>
        <ChildFolderItem {...folder} />
      </li>
    );
  });

  const renderChildBookmark = bookmarks.map(bookmark => {
    return (
      <li key={bookmark.id}>
        <ChildBookmarkItem {...bookmark} />
      </li>
    );
  });

  const renderChild = (
    <ul>
      {renderChildFolder} {renderChildBookmark}
    </ul>
  );
  return (
    <ChildsList
      title="Bookmarks"
      folders={child.folders}
      bookmarks={child.bookmarks}
    >
      {folders.length || bookmarks.length
        ? renderChild
        : "Does not have bookmark yet"}
    </ChildsList>
  );
};

const mapStateToProps = (state, ownProps) => {
  const id =
    ownProps.match.params.id === undefined ? "0" : ownProps.match.params.id;

  return {
    child: getChildFolder(state, id)
  };
};

export default connect(mapStateToProps)(ChildContainer);
