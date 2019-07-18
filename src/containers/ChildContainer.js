import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { getBookmarkItemlistById } from "../reducers";
import {
  selectFolder,
  deleteFolder,
  deleteFolderChild,
  editBookmark,
  editFolderName
} from "../actions";

import BookmarkItem from "../components/Bookmark/BookmarkItem";
import FolderItem from "../components/Folder/FolderItem";

import ChildsList from "../components/Child/ChildsList";
import ChildItem from "../components/Child/ChildItem";

const Title = styled.h1`
  color: white;
`;

class ChildContainer extends Component {
  constructor(props) {
    super(props);
    this.handleOnItemClick = this.handleOnItemClick.bind(this);
  }

  handleOnItemClick(e) {
    e.preventDefault();
  }

  render() {
    const { bookmarkList, folder } = this.props;
    const { orderChildIds } = folder;

    const renderChildFolder = folder => {
      return (
        <ChildItem key={folder.id}>
          <FolderItem
            onSelectFolder={() => selectFolder(folder.id)}
            {...folder}
          />
        </ChildItem>
      );
    };

    const renderChildBookmark = bookmark => {
      return (
        <ChildItem key={bookmark.id}>
          <BookmarkItem {...bookmark} />
        </ChildItem>
      );
    };

    const renderChild = orderChildIds.map(id => {
      switch (bookmarkList[id].type) {
        case "folder":
          return renderChildFolder(bookmarkList[id].folder);
        case "bookmark":
          return renderChildBookmark(bookmarkList[id].bookmark);
        default:
          return "";
      }
    });

    return (
      <>
        {orderChildIds.length ? (
          <ChildsList>{renderChild}</ChildsList>
        ) : (
          <Title>Does not have bookmark yet</Title>
        )}
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const id =
    ownProps.match.params.id === undefined ? "0" : ownProps.match.params.id;
  return {
    folder: state.folders.byId[id],
    bookmarkList: getBookmarkItemlistById(state, id)
  };
};

export default connect(
  mapStateToProps,
  { selectFolder }
)(ChildContainer);
