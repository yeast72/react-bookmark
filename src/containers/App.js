import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import uuidv1 from "uuid/v1";

import FolderContainer from "./FolderContainer";
import ChildContainer from "./ChildContainer";
import Navbar from "../components/Navbar";
import ModalAddBookmark from "../components/Modal/ModalAddBookmark";
import ModalAddFolder from "../components/Modal/ModalAddFolder";

import history from "../history";
import {
  addBookmark,
  createBookmark,
  toggleAddBookmarkModal,
  toggleAddFolderModal,
  createFolder,
  addFolder
} from "../actions";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  line-height: 1.54;
  background-color: #383330;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  overflow: hidden;
`;

const BookmarkListContainer = styled.div`
  flex: 1;
  overflow-x: hidden;
  min-width: 300px;
  overflow-y: auto;
  padding-bottom: 24px;
  padding-top: 24px;
  padding-inline-start: 24px;
  padding-inline-end: 24px;
`;

const SideBar = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 40%;
  min-width: 260px;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddBookmarkModelOpen: false,
      isAddFolderModalOpen: false
    };
    this.handleAddBookmark = this.handleAddBookmark.bind(this);
    this.handleAddFolder = this.handleAddFolder.bind(this);
  }

  handleAddFolder(name) {
    const { toggleAddFolderModal } = this.props;
    toggleAddFolderModal();
    const newId = uuidv1();
    const folder = {
      id: newId,
      name,
      childFolderIds: [],
      bookmarkIds: []
    };
    this.props.createFolder(folder);
    this.props.addFolder(folder.id, this.props.selectedFolderId);
  }

  handleAddBookmark(name, url) {
    const { toggleAddBookmarkModal } = this.props;
    toggleAddBookmarkModal();
    const newId = uuidv1();
    const bookmark = {
      id: newId,
      name,
      url
    };
    this.props.createBookmark(bookmark);
    this.props.addBookmark(bookmark.id, this.props.selectedFolderId);
  }

  render() {
    const { toggleAddBookmarkModal, toggleAddFolderModal } = this.props;
    const {
      isAddBookmarkModalOpened,
      isAddFolderModalOpened
    } = this.props.modals;

    const addFolderModal = (
      <ModalAddFolder
        onCancel={toggleAddFolderModal}
        onAddFolder={this.handleAddFolder}
      />
    );

    const addBookmarkModal = (
      <ModalAddBookmark
        onCancel={toggleAddBookmarkModal}
        onAddBookmark={this.handleAddBookmark}
      />
    );

    const renderAddFolderModel = isAddFolderModalOpened ? addFolderModal : "";
    const renderAddBookmarkModel = isAddBookmarkModalOpened
      ? addBookmarkModal
      : "";

    return (
      <AppContainer>
        <Navbar />
        <MainContainer>
          <Router history={history}>
            <SideBar>
              <FolderContainer />
            </SideBar>
            <BookmarkListContainer>
              {renderAddFolderModel}
              {renderAddBookmarkModel}
              <button onClick={toggleAddFolderModal}>Add Folder</button>
              <button onClick={toggleAddBookmarkModal}>Add Bookmark</button>
              <Route exact path="/" component={ChildContainer} />
              <Route path="/:id" component={ChildContainer} />
            </BookmarkListContainer>
          </Router>
        </MainContainer>
      </AppContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedFolderId: state.folders.selectedFolderId,
    modals: state.modals
  };
};

export default connect(
  mapStateToProps,
  {
    addBookmark,
    createBookmark,
    createFolder,
    addFolder,
    toggleAddBookmarkModal,
    toggleAddFolderModal
  }
)(App);
