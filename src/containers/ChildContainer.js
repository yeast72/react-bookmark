import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import history from "../history";
import { getBookmarkItemlistById } from "../reducers";
import {
  selectFolder,
  selectBookmark,
  editBookmark,
  editFolderName,
  toggleUpdateBookmarkModal,
  toggleUpdateFolderModal
} from "../actions";

import BookmarkItem from "../components/Bookmark/BookmarkItem";
import FolderItem from "../components/Folder/FolderItem";
import ModalUpdateBookmark from "../components/Modal/ModalUpdateBookmark";
import ModalUpdateFolder from "../components/Modal/ModalUpdateFolder";

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
    this.handleUpdateBookmark = this.handleUpdateBookmark.bind(this);
    this.handleUpdateFolder = this.handleUpdateFolder.bind(this);
    this.preventAction = false;
    this.delay = 50;
  }

  handleOpenUpdateFolderModal(id, e) {
    const { onToggleUpdateFolder, onSelectBookmark } = this.props;
    e.stopPropagation();
    onSelectBookmark(id);
    onToggleUpdateFolder();
  }

  handleOpenUpdateBookmarkModal(id, e) {
    const { onToggleUpdateBookmark, onSelectBookmark } = this.props;
    e.stopPropagation();
    onSelectBookmark(id);
    onToggleUpdateBookmark();
  }

  handleUpdateBookmark(name, url) {
    const {
      onToggleUpdateBookmark,
      onEditBookmark,
      activeBookmarkId
    } = this.props;
    onEditBookmark(activeBookmarkId, name, url);
    onToggleUpdateBookmark();
  }

  handleUpdateFolder(name) {
    const { onToggleUpdateFolder, onEditFolder, activeBookmarkId } = this.props;
    onEditFolder(activeBookmarkId, name);
    onToggleUpdateFolder();
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
    const { bookmarkList, folder, activeBookmarkId } = this.props;
    const { orderChildIds } = folder;
    const isActive = id => {
      return id.toString() === activeBookmarkId.toString();
    };

    const renderUpdateBookmarkModal = () => {
      const {
        isUpdateBookmarkModalOpened,
        onToggleUpdateBookmark,
        bookmarkList,
        activeBookmarkId,
        onEditBookmark
      } = this.props;
      return isUpdateBookmarkModalOpened ? (
        <ModalUpdateBookmark
          onCancel={onToggleUpdateBookmark}
          onSave={this.handleUpdateBookmark}
          bookmark={bookmarkList[activeBookmarkId].bookmark}
        />
      ) : (
        ""
      );
    };

    const renderUpdateFolderModal = () => {
      const {
        isUpdateFolderModalOpened,
        onToggleUpdateFolder,
        bookmarkList,
        activeBookmarkId,
        onEditFolder
      } = this.props;
      return isUpdateFolderModalOpened ? (
        <ModalUpdateFolder
          onCancel={onToggleUpdateFolder}
          onSave={this.handleUpdateFolder}
          folder={bookmarkList[activeBookmarkId].folder}
        />
      ) : (
        ""
      );
    };

    const renderChildFolder = folder => {
      const id = folder.id;
      const { onToggleUpdateFolder } = this.props;
      return (
        <ChildItem
          key={id}
          type={"folder"}
          onToggleUpdateModal={e => this.handleOpenUpdateFolderModal(id, e)}
          onClick={this.handleOnItemClick}
          onItemClick={e => this.handleOnItemClick(id, e)}
          onOpenBookmark={e => this.handleDoubleClickFolder(id, e)}
          active={isActive(id)}
        >
          <FolderItem {...folder} />
        </ChildItem>
      );
    };

    const renderChildBookmark = bookmark => {
      const { id, url } = bookmark;
      const { onToggleUpdateBookmark } = this.props;
      return (
        <ChildItem
          key={id}
          type={"bookmark"}
          onToggleUpdateModal={e => this.handleOpenUpdateBookmarkModal(id, e)}
          onItemClick={e => this.handleOnItemClick(id, e)}
          onOpenBookmark={e => this.handleDoubleClickBookmark(url, e)}
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
        {renderUpdateFolderModal()}
        {renderUpdateBookmarkModal()}

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
    activeBookmarkId: state.activeBookmarkId,
    isUpdateBookmarkModalOpened: state.modals.isUpdateBookmarkModalOpened,
    isUpdateFolderModalOpened: state.modals.isUpdateFolderModalOpened
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
    onToggleUpdateBookmark: () => {
      dispatch(toggleUpdateBookmarkModal());
    },
    onToggleUpdateFolder: () => {
      dispatch(toggleUpdateFolderModal());
    },
    onEditBookmark: (bookmarkId, name, url) => {
      dispatch(editBookmark(bookmarkId, name, url));
    },
    onEditFolder: (folderId, name) => {
      dispatch(editFolderName(folderId, name));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChildContainer);
