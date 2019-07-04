import React, { Component } from "react";
import { Link } from "react-router-dom";
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
    const { parentId, childFolderIds, name, id } = this.props;

    return (
      <div>
        <Link to={id}>
          <Folder name={name} />{" "}
        </Link>
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
  return state.folders.byId[ownProps.id];
};

const ConnectedFolder = connect(mapStateToProps)(FolderItem);

export default ConnectedFolder;
