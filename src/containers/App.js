import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";

import FolderContainer from "./FolderContainer";
import ChildContainer from "./ChildContainer";
import Navbar from "../components/Navbar";
import ModalRoot from "../components/Modal/ModalRoot";

import history from "../history";
import {
  addBookmark,
  createBookmark,
  showModal,
  createFolder,
  addFolder,
  selectBookmark
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
    this.handleAddBookmarkButton = this.handleAddBookmarkButton.bind(this);
    this.handleAddFolderButton = this.handleAddFolderButton.bind(this);
  }

  handleAddBookmarkButton(e) {
    const { showModal } = this.props;
    showModal("ADD_BOOKMARK", "");
    e.stopPropagation();
  }

  handleAddFolderButton(e) {
    const { showModal } = this.props;
    showModal("ADD_FOLDER", "");
    e.stopPropagation();
  }

  render() {
    const { selectBookmark } = this.props;

    return (
      <AppContainer>
        <Navbar />
        <MainContainer>
          <Router history={history}>
            <ModalRoot />
            <SideBar>
              <FolderContainer />
            </SideBar>
            <BookmarkListContainer onClick={() => selectBookmark("")}>
              <button onClick={e => this.handleAddFolderButton(e)}>
                Add Folder
              </button>
              <button onClick={e => this.handleAddBookmarkButton(e)}>
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
  return {
    selectedFolderId: state.folders.selectedFolderId,
    modal: state.modal
  };
};

export default connect(
  mapStateToProps,
  {
    addBookmark,
    createBookmark,
    createFolder,
    addFolder,
    showModal,
    selectBookmark
  }
)(App);
