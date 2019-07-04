import React from "react";
import { connect } from "react-redux";
import { getRootFolder } from "../reducers";
import FoldersList from "../components/FoldersList";
import FolderItem from "../components/FolderItem";

const FolderContainer = ({ rootFolder, children }) => {
  return (
    <FoldersList title="Bookmark bar">
      <FolderItem id={rootFolder.id} />
      {children}
    </FoldersList>
  );
};

const mapStateToProps = (state, ownProps) => ({
  rootFolder: getRootFolder(state.folders),
  children: ownProps.children
  //   children: ownProps
});

export default connect(mapStateToProps)(FolderContainer);
