import React from "react";
import { connect } from "react-redux";
import { getRootFolder } from "../reducers";
import FoldersList from "../components/Folder/FoldersList";
import FolderNode from "./FolderNode";

const FolderContainer = ({ rootFolder }) => {
  return (
    <FoldersList title="Bookmark bar">
      <FolderNode id={rootFolder.id} />
    </FoldersList>
  );
};

const mapStateToProps = state => ({
  rootFolder: getRootFolder(state)
});

export default connect(mapStateToProps)(FolderContainer);
