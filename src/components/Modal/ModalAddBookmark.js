import React, { Component } from "react";
import Modal from "./Modal";
import { faTintSlash } from "@fortawesome/free-solid-svg-icons";

export default class ModalAddBookmark extends Component {
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
    this.props.onAddBookmark(this.state.name, this.state.url);
  }

  render() {
    const { onCancel } = this.props;
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
        <button onClick={onCancel}>Cancel</button>
      </Modal>
    );
  }
}
