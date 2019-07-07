import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { getChildFolder, getBookmarksFromFolderId } from "../reducers";
import { selectFolder } from "../actions";

import ChildsList from "../components/Child/ChildsList";
import ChildFolderItem from "../components/Child/ChildFolderItem";
import ChildBookmarkItem from "../components/Child/ChildBookmarkItem";

const ChildItemContainer = styled.li`
  list-style-type: none;
  width: 100%;
  display: flex;
  flex-direction: row;
  height: 40px;
  padding-inline-start: 20px;
  position: relative;
  text-decoration: none;
  user-select: none;
`;

class ChildContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { folders, bookmarks } = this.props.child;

    const renderChildFolder = folders.map(folder => {
      return (
        <ChildItemContainer key={folder.id}>
          <ChildFolderItem
            onSelectFolder={() => selectFolder(folder.id)}
            {...folder}
          />
        </ChildItemContainer>
      );
    });

    const renderChildBookmark = bookmarks.map(bookmark => {
      return (
        <ChildItemContainer key={bookmark.id}>
          <ChildBookmarkItem {...bookmark} />
        </ChildItemContainer>
      );
    });

    const renderChild = (
      <ul>
        {renderChildFolder} {renderChildBookmark}
      </ul>
    );

    return (
      <ChildsList folders={folders} bookmarks={bookmarks}>
        {folders.length || bookmarks.length
          ? renderChild
          : "Does not have bookmark yet"}
      </ChildsList>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const id =
    ownProps.match.params.id === undefined ? "0" : ownProps.match.params.id;

  return {
    child: getChildFolder(state, id)
  };
};

export default connect(
  mapStateToProps,
  { selectFolder }
)(ChildContainer);
