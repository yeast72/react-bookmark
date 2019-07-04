import React, { Component } from "react";
import Folder from "./Folder";
import { connect } from "react-redux";

export class FolderItem extends Component {
  renderChild = childFolderIds => {
    const { id } = this.props;
    console.log(childFolderIds);
    return (
      <li key={childFolderIds}>
        <ConnectedFolder id={childFolderIds} parentId={id} />
      </li>
    );
  };

  render() {
    const { parentId, id, childFolderIds, name, url } = this.props;
    console.log(this.props);
    return (
      <div>
        <Folder name={name} url={url} />{" "}
        {typeof parentId !== "undefined" && (
          <a
            href="#"
            onClick={this.handleRemoveClick} // eslint-disable-line jsx-a11y/anchor-is-valid
            style={{ color: "lightgray", textDecoration: "none" }}
          >
            ×
          </a>
        )}
        <ul>{childFolderIds.map(this.renderChild)}</ul>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps);
  return state.folders.byId[ownProps.id];
};

const ConnectedFolder = connect(mapStateToProps)(FolderItem);

export default ConnectedFolder;
