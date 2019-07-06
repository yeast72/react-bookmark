import React from "react";
import { connect } from "react-redux";
import { getRootFolder } from "../reducers";
import FoldersList from "../components/Folder/FoldersList";
import FolderItem from "../components/Folder/FolderItem";

const FolderContainer = ({ rootFolder, children }) => {
  return (
    <FoldersList title="Bookmark bar">
      <FolderItem id={rootFolder.id} />
      {children}
    </FoldersList>
  );
};

const mapStateToProps = (state, ownProps) => ({
  rootFolder: getRootFolder(state),
  children: ownProps.children
  //   children: ownProps
});

export default connect(mapStateToProps)(FolderContainer);
