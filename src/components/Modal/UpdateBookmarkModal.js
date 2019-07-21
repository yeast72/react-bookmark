import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { hideModal, editBookmark } from "../../actions";
import Modal from "./Modal";

class UpdateBookmarkModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.bookmark.name,
      url: this.props.bookmark.url
    };
    this.handleSave = this.handleSave.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSave() {
    const { hideModal, editBookmark, bookmark } = this.props;
    hideModal();
    editBookmark(bookmark.id, this.state.name, this.state.url);
  }

  render() {
    const { hideModal } = this.props;
    return (
      <Modal title="Edit bookmark">
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="...Bookmark name"
            value={this.state.name}
            onChange={e => this.handleChange(e)}
          />
        </div>
        <div>
          <label>Bookmark URL</label>
          <input
            type="text"
            name="url"
            placeholder="...Bookmark URL"
            value={this.state.url}
            onChange={e => this.handleChange(e)}
          />
        </div>

        <button onClick={this.handleSave}>Save</button>
        <button onClick={hideModal}>Cancel</button>
      </Modal>
    );
  }
}

UpdateBookmarkModal.propTypes = {
  bookmark: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string
  }).isRequired
};

const mapStateToProps = (state, ownProps) => {
  return { bookmark: state.bookmarks.byId[ownProps.id] };
};

export default connect(
  mapStateToProps,
  { hideModal, editBookmark }
)(UpdateBookmarkModal);
