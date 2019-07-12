import React, { Component } from "react";
import Modal from "./Modal";

export default class ModalAddFolder extends Component {
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
    this.props.onAddFolder(this.state.name);
  }

  render() {
    const { onCancel } = this.props;
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
        <button onClick={onCancel}>Cancel</button>
      </Modal>
    );
  }
}
