import React from "react";
import { connect } from "react-redux";
import { getRootFolder } from "../reducers";
import FoldersList from "../components/FoldersList";
import FolderItem from "../components/FolderItem";

const FolderContainer = ({ rootFolder }) => {
  return (
    <FoldersList title="Bookmark bar">
      <FolderItem id={rootFolder.id} />
    </FoldersList>
  );
};

const mapStateToProps = state => ({
  rootFolder: getRootFolder(state.folders)
});

export default connect(mapStateToProps)(FolderContainer);
