import React, { Component } from "react";
import uuidv1 from "uuid/v1";
import styled from "styled-components";

import { connect } from "react-redux";
import { hideModal, createBookmark, addBookmark } from "../../actions";
import Modal from "./Modal";

class AddBookmarkModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      url: ""
    };
    this.handleSave = this.handleSave.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSave() {
    const {
      createBookmark,
      addBookmark,
      selectedFolderId,
      hideModal
    } = this.props;
    const newId = uuidv1();
    const bookmark = {
      id: newId,
      name: this.state.name,
      url: this.state.url
    };
    createBookmark(bookmark);
    addBookmark(bookmark.id, selectedFolderId);
    hideModal();
  }

  render() {
    return (
      <Modal title="Add Bookmark">
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Bookmark name"
            onChange={e => this.handleChange(e)}
          />
        </div>
        <div>
          <label>Bookmark URL</label>
          <input
            type="text"
            name="url"
            placeholder="Bookmark URL"
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
  { hideModal, createBookmark, addBookmark }
)(AddBookmarkModal);
