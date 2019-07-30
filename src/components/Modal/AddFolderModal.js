import React, { Component } from "react";
import { connect } from "react-redux";
import uuidv1 from "uuid/v1";
import { createFolder, addFolder, hideModal } from "../../actions";

import Modal from "./Modal";

class AddFolderModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
    this.handleSave = this.handleSave.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSave() {
    const { hideModal, createFolder, addFolder, selectedFolderId } = this.props;

    const newId = uuidv1();
    const folder = {
      id: newId,
      name: this.state.name
    };
    createFolder(folder);
    addFolder(folder.id, selectedFolderId);
    hideModal();
  }

  render() {
    return (
      <Modal title="Add Folder">
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Folder name"
            onChange={e => this.handleChange(e)}
          />
        </div>
        <button onClick={this.handleSave}>Save</button>
        <button onClick={this.props.hideModal}>Cancel</button>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return { selectedFolderId: state.folders.selectedFolderId };
};

export default connect(
  mapStateToProps,
  { hideModal, createFolder, addFolder }
)(AddFolderModal);
