import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faTrashAlt,
  faEdit
} from "@fortawesome/free-solid-svg-icons";

import Folder from "../components/Folder/Folder";

import history from "../history";
import { selectFolder, deleteFolder, deleteFolderChild } from "../actions";

const Container = styled.div`
  cursor: pointer;
  margin: 5px 0;
  display: flex;
  flex-direction: column;
`;

const FolderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  padding-inline-start: ${props => (props.nodeDepth || 0) * 36}px;
  /* margin-inline-start: ${props => (props.haveChild ? 0 : 54)}px; */
  color: ${props => (props.active ? "blue" : "#757575")};
`;

const StyleButton = styled(FontAwesomeIcon)`
  padding: 8px;
  transition: background-color 50ms linear;
  border-radius: 4px;
  color: #757575;
  :hover {
    background-color: #c1a594;
  }
`;

export class FolderNode extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.handleOnSelectFolder = this.handleOnSelectFolder.bind(this);
    this.handleToggleFolder = this.handleToggleFolder.bind(this);
    this.handleDeleteFolder = this.handleDeleteFolder.bind(this);
  }

  handleToggleFolder(e) {
    e.stopPropagation();
    this.setState({ open: !this.state.open });
  }

  handleDeleteFolder(e) {
    const {
      id,
      onDeleteFolder,
      onDeleteFolderChild,
      onSelectFolder,
      parentId,
      selectedFolderId
    } = this.props;
    e.stopPropagation();

    if (id.toString() === selectedFolderId.toString()) {
      onSelectFolder(parentId);
      history.push(`${parentId}`);
    }
    onDeleteFolderChild(parentId, id);
    onDeleteFolder(id);
  }

  handleOnSelectFolder(e) {
    const { id, onSelectFolder } = this.props;
    onSelectFolder(id);
    e.stopPropagation();
    history.push(`${id}`);
  }

  renderChild = childFolderIds => {
    const { id } = this.props;
    const { nodeDepth = 0 } = this.props;
    return (
      <ConnectedFolderNode
        key={childFolderIds}
        id={childFolderIds}
        parentId={id}
        nodeDepth={nodeDepth + 1}
      />
    );
  };

  render() {
    const { id, name, childFolderIds } = this.props.folder;
    const { selectedFolderId, nodeDepth = 0, parentId } = this.props;

    const haveChild = childFolderIds.length;
    const renderOption = (
      <>
        <StyleButton onClick={this.handleDeleteFolder} icon={faTrashAlt} />
        <StyleButton icon={faEdit} />
      </>
    );
    const renderToggleFolder = (
      <span onClick={this.handleToggleFolder}>
        <StyleButton icon={faCaretDown} />
      </span>
    );

    const isActive = id.toString() === selectedFolderId.toString();

    return (
      <Container>
        <FolderContainer
          nodeDepth={nodeDepth}
          onClick={this.handleOnSelectFolder}
          active={isActive}
          haveChild={haveChild}
        >
          {haveChild ? renderToggleFolder : ""}
          <Folder name={name} id={id} />
          {typeof parentId !== "undefined" && renderOption}
        </FolderContainer>
        {this.state.open ? (
          <Container>{childFolderIds.map(this.renderChild)} </Container>
        ) : (
          ""
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  folder: state.folders.byId[ownProps.id],
  selectedFolderId: state.folders.selectedFolderId
});

const mapDispatchToProps = dispatch => {
  return {
    onSelectFolder: id => {
      dispatch(selectFolder(id));
    },
    onDeleteFolder: id => {
      dispatch(deleteFolder(id));
    },
    onDeleteFolderChild: (folderId, childId) => {
      dispatch(deleteFolderChild(folderId, childId));
    }
  };
};

const ConnectedFolderNode = connect(
  mapStateToProps,
  mapDispatchToProps
)(FolderNode);

export default ConnectedFolderNode;
