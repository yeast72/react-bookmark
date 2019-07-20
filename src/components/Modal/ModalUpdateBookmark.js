import React, { Component } from "react";
import PropTypes from "prop-types";
import Modal from "./Modal";

class ModalUpdateBookmark extends Component {
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
    this.props.onSave(this.state.name, this.state.url);
  }

  render() {
    const { onCancel } = this.props;
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
        <button onClick={onCancel}>Cancel</button>
      </Modal>
    );
  }
}

ModalUpdateBookmark.propTypes = {
  bookmark: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string
  }).isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
};

export default ModalUpdateBookmark;
