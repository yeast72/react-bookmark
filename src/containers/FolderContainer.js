import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { getRootFolder } from "../reducers";
import FoldersList from "../components/Folder/FoldersList";
import FolderNode from "./FolderNode";

const BookmarkFolderMode = styled.div`
  display: block;
  overflow-y: auto;
  padding: 8px 3px 0 3px;
  user-select: none;
`;

const FolderContainer = ({ rootFolder }) => {
  return (
    <FoldersList title="Bookmark bar">
      <FolderNode id={rootFolder.id} />

      <FolderNode id={rootFolder.id} />
    </FoldersList>
  );
};

const mapStateToProps = state => ({
  rootFolder: getRootFolder(state)
});

export default connect(mapStateToProps)(FolderContainer);
