import React, { Component } from "react";
import PropTypes from "prop-types";
import Modal from "./Modal";

class ModalUpdateFolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.folder.name
    };
    this.handleSave = this.handleSave.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSave() {
    this.props.onSave(this.state.name);
  }

  render() {
    const { onCancel } = this.props;
    return (
      <Modal title="Edit folder">
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Bookmark name"
            value={this.state.name}
            onChange={e => this.handleChange(e)}
          />
        </div>
        <button onClick={this.handleSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </Modal>
    );
  }
}

ModalUpdateFolder.propTypes = {
  folder: PropTypes.shape({
    name: PropTypes.string
  }).isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
};

export default ModalUpdateFolder;
