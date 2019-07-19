import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import history from "../history";
import { getBookmarkItemlistById } from "../reducers";
import { selectFolder, selectBookmark } from "../actions";

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
    this.handleDoubleClickBookmark = this.handleDoubleClickBookmark.bind(this);
    this.handleDoubleClickFolder = this.handleDoubleClickFolder.bind(this);
    this.handleOnItemClick = this.handleOnItemClick.bind(this);
    this.preventAction = false;
    this.delay = 50;
  }

  handleOnItemClick(id, e) {
    e.stopPropagation();
    const { onSelectBookmark } = this.props;
    this.timer = setTimeout(() => {
      if (!this.preventAction) {
        onSelectBookmark(id);
      }
      this.preventAction = false;
    }, this.delay);
  }

  handleDoubleClickFolder(id, e) {
    e.stopPropagation();
    clearTimeout(this.timer);
    this.preventAction = true;

    const { onSelectFolder } = this.props;

    onSelectFolder(id);
    history.push(`${id}`);
  }

  handleDoubleClickBookmark(url, e) {
    e.stopPropagation();
    clearTimeout(this.timer);
    this.preventAction = true;
    window.open(url, "_blank");
  }

  render() {
    const { bookmarkList, folder, activeBookmarkId } = this.props;
    const { orderChildIds } = folder;
    const isActive = id => {
      return id.toString() === activeBookmarkId.toString();
    };
    const renderChildFolder = folder => {
      const id = folder.id;
      return (
        <ChildItem
          key={id}
          onClick={this.handleOnItemClick}
          OnItemClick={e => this.handleOnItemClick(id, e)}
          OnOpenBookmark={e => this.handleDoubleClickFolder(id, e)}
          active={isActive(id)}
        >
          <FolderItem {...folder} />
        </ChildItem>
      );
    };

    const renderChildBookmark = bookmark => {
      const { id, url } = bookmark;
      return (
        <ChildItem
          key={id}
          OnItemClick={e => this.handleOnItemClick(id, e)}
          OnOpenBookmark={e => this.handleDoubleClickBookmark(url, e)}
          active={isActive(id)}
        >
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
    bookmarkList: getBookmarkItemlistById(state, id),
    activeBookmarkId: state.activeBookmarkId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSelectFolder: id => {
      dispatch(selectFolder(id));
    },
    onSelectBookmark: id => {
      dispatch(selectBookmark(id));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChildContainer);
