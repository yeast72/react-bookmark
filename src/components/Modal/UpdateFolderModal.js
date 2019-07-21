import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { hideModal, editFolderName } from "../../actions";
import Modal from "./Modal";

class UpdateFolderModal extends Component {
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
    const { hideModal, editFolderName, folder } = this.props;
    editFolderName(folder.id, this.state.name);
    hideModal();
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

UpdateFolderModal.propTypes = {
  folder: PropTypes.shape({
    name: PropTypes.string
  }).isRequired
};

const mapStateToProps = (state, ownProps) => {
  return { folder: state.folders.byId[ownProps.id] };
};

export default connect(
  mapStateToProps,
  { hideModal, editFolderName }
)(UpdateFolderModal);
