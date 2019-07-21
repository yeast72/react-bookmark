import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import history from "../history";
import { getBookmarkItemlistById } from "../reducers";
import {
  selectFolder,
  selectBookmark,
  deleteFolder,
  deleteBookmark,
  deleteFolderChild,
  deleteBookmarkChild,
  showModal
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
    this.handleDoubleClickBookmark = this.handleDoubleClickBookmark.bind(this);
    this.handleDoubleClickFolder = this.handleDoubleClickFolder.bind(this);
    this.handleOnItemClick = this.handleOnItemClick.bind(this);
    this.handleOpenUpdateBookmarkModal = this.handleOpenUpdateBookmarkModal.bind(
      this
    );
    this.handleOpenUpdateFolderModal = this.handleOpenUpdateFolderModal.bind(
      this
    );
    this.preventAction = false;
    this.delay = 50;
  }

  handleOpenUpdateFolderModal(id) {
    const { onShowModal } = this.props;
    onShowModal("UPDATE_FOLDER", { id: id });
  }

  handleOpenUpdateBookmarkModal(id) {
    const { onShowModal } = this.props;
    onShowModal("UPDATE_BOOKMARK", { id: id });
  }

  handleOnItemClick(id, e) {
    const { onSelectBookmark } = this.props;
    this.timer = setTimeout(() => {
      if (!this.preventAction) {
        onSelectBookmark(id);
      }
      this.preventAction = false;
    }, this.delay);
    e.stopPropagation();
  }

  handleDoubleClickFolder(id, e) {
    const { onSelectFolder } = this.props;
    onSelectFolder(id);
    history.push(`${id}`);

    this.preventAction = true;
    clearTimeout(this.timer);
    e.stopPropagation();
  }

  handleDoubleClickBookmark(url, e) {
    e.stopPropagation();
    clearTimeout(this.timer);
    this.preventAction = true;
    window.open(url, "_blank");
  }

  render() {
    const {
      bookmarkList,
      folder,
      activeBookmarkId,
      onDeleteBookmark,
      onDeleteFolder
    } = this.props;
    const { orderChildIds } = folder;
    const isActive = id => {
      return id.toString() === activeBookmarkId.toString();
    };

    const renderChildFolder = folder => {
      const id = folder.id;
      const parentId = this.props.folder.id;
      return (
        <ChildItem
          key={id}
          type={"folder"}
          onToggleUpdateModal={() => this.handleOpenUpdateFolderModal(id)}
          onClick={this.handleOnItemClick}
          onItemClick={e => this.handleOnItemClick(id, e)}
          onOpenBookmark={e => this.handleDoubleClickFolder(id, e)}
          onDelete={() => onDeleteFolder(id, parentId)}
          active={isActive(id)}
        >
          <FolderItem {...folder} />
        </ChildItem>
      );
    };

    const renderChildBookmark = bookmark => {
      const { id, url } = bookmark;
      const { folder } = this.props;
      return (
        <ChildItem
          key={id}
          type={"bookmark"}
          onToggleUpdateModal={() => this.handleOpenUpdateBookmarkModal(id)}
          onItemClick={e => this.handleOnItemClick(id, e)}
          onOpenBookmark={e => this.handleDoubleClickBookmark(url, e)}
          onDelete={() => onDeleteBookmark(id, folder.id)}
          active={isActive(id, folder.id)}
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
    },
    onDeleteBookmark: (id, folderId) => {
      dispatch(deleteBookmarkChild(id, folderId));
      dispatch(deleteBookmark(id));
    },
    onDeleteFolder: (id, folderId) => {
      dispatch(deleteFolderChild(id, folderId));
      dispatch(deleteFolder(id));
    },
    onShowModal: (modalType, modalProps) => {
      dispatch(showModal(modalType, modalProps));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChildContainer);
