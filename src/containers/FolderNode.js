import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import Folder from "../components/Folder/Folder";

import history from "../history";
import { selectFolder, deleteFolder, deleteFolderChild } from "../actions";

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

const ButtonIcon = styled(FontAwesomeIcon)`
  margin-inline-end: 10px;
  margin-inline-start: 5px;
`;

export class FolderNode extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.handleOnSelectFolder = this.handleOnSelectFolder.bind(this);
    this.handleToggleFolder = this.handleToggleFolder.bind(this);
  }

  handleToggleFolder(e) {
    e.stopPropagation();
    this.setState({ open: !this.state.open });
  }

  handleOnSelectFolder(e) {
    const { id, onSelectFolder } = this.props;
    onSelectFolder(id);
    e.stopPropagation();
    history.push(`${id}`);
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
    const renderOption = <ButtonIcon icon={faTrashAlt} />;
    const renderToggleFolder = haveChild ? (
      <span onClick={this.handleToggleFolder}>
        <ButtonIcon icon={faCaretDown} />
      </span>
    ) : (
      ""
    );

    return (
      <FolderNodeContainer onClick={this.handleOnSelectFolder}>
        <li>
          {renderToggleFolder}
          <FolderContainer>
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

const mapDispatchToProps = dispatch => {
  return {
    onSelectFolder: id => {
      dispatch(selectFolder(id));
    }
  };
};

const ConnectedFolderNode = connect(
  mapStateToProps,
  mapDispatchToProps
)(FolderNode);

export default ConnectedFolderNode;
