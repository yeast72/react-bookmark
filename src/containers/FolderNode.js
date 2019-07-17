import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

import Folder from "../components/Folder/Folder";

import { selectFolder } from "../actions";

const FolderNodeContainer = styled.ul`
  cursor: pointer;
  list-style-type: none;
  padding-inline-start: 15px;
  margin: 5px 0;
`;

const FolderContainer = styled.div`
  cursor: pointer;
  display: inline;
  height: 40;
  position: relative;
`;

export class FolderNode extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  handleToggleFolder() {
    // e.stopPropagation();
    this.setState({ open: !this.state.open });
  }

  handleOnSelectFolder(e) {
    const { id, selectFolder } = this.props;
    selectFolder(id);
    e.stopPropagation();
  }

  renderChild = childFolderIds => {
    const { id } = this.props;
    return (
      <li key={childFolderIds}>
        <ConnectedFolderNode id={childFolderIds} parentId={id} />
      </li>
    );
  };

  render() {
    const { parentId, childFolderIds, name, id, selectFolder } = this.props;
    const haveChild = childFolderIds.length;
    const renderOption = (
      <a
        href="#"
        onClick={this.handleRemoveClick} // eslint-disable-line jsx-a11y/anchor-is-valid
        style={{ color: "lightgray", textDecoration: "none" }}
      >
        ×
      </a>
    );
    const renderToggleFolder = haveChild ? (
      <span onClick={() => this.handleToggleFolder()}>
        <FontAwesomeIcon icon={faCaretDown} />
      </span>
    ) : (
      ""
    );

    return (
      <FolderNodeContainer>
        <li>
          {renderToggleFolder}
          <FolderContainer onClick={e => this.handleOnSelectFolder(e)}>
            <Folder name={name} id={id} />{" "}
            {typeof parentId !== "undefined" && renderOption}
            {this.state.open ? (
              <FolderNodeContainer>
                {childFolderIds.map(this.renderChild)}{" "}
              </FolderNodeContainer>
            ) : (
              ""
            )}
          </FolderContainer>
        </li>
      </FolderNodeContainer>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return state.folders.byId[ownProps.id];
};

const ConnectedFolderNode = connect(
  mapStateToProps,
  { selectFolder }
)(FolderNode);

export default ConnectedFolderNode;
