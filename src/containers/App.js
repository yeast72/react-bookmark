import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import uuidv1 from "uuid/v1";

import FolderContainer from "./FolderContainer";
import ChildContainer from "./ChildContainer";
import Navbar from "../components/Navbar";
import ModalAddBookmark from "../components/Modal/ModalAddBookmark";

import { addBookmark, createBookmark } from "../actions";

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
    this.toggleAddBookmarkModal = this.toggleAddBookmarkModal.bind(this);
    this.toggleAddFolderModal = this.toggleAddFolderModal.bind(this);
    this.handleAddBookmark = this.handleAddBookmark.bind(this);
  }

  toggleAddBookmarkModal() {
    this.setState({
      isAddBookmarkModelOpen: !this.state.isAddBookmarkModelOpen
    });
  }

  toggleAddFolderModal() {
    this.setState({
      isAddFolderModalOpen: !this.state.isAddFolderModalOpen
    });
  }

  handleAddBookmark(name, url) {
    this.toggleAddBookmarkModal();
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
    const addFolderModal = (
      <ModalAddBookmark
        onCancel={this.toggleAddFolderModal}
        onAddBookmark={this.handleAddBookmark}
      />
    );

    const addBookmarkModal = (
      <ModalAddBookmark
        onCancel={this.toggleAddBookmarkModal}
        onAddBookmark={this.handleAddBookmark}
      />
    );

    const renderAddFolderModel = this.state.isAddFolderModalOpen
      ? addFolderModal
      : "";

    const renderAddBookmarkModel = this.state.isAddBookmarkModelOpen
      ? addBookmarkModal
      : "";

    return (
      <AppContainer>
        <Navbar />
        <MainContainer>
          <Router>
            <SideBar>
              <FolderContainer />
            </SideBar>
            <BookmarkListContainer>
              {renderAddFolderModel}
              {renderAddBookmarkModel}
              <button onClick={this.toggleAddFolderModal}>Add Folder</button>
              <button onClick={this.toggleAddBookmarkModal}>
                Add Bookmark
              </button>
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
  return { selectedFolderId: state.folders.selectedFolderId };
};

export default connect(
  mapStateToProps,
  { addBookmark, createBookmark }
)(App);
