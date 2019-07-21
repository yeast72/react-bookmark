import React from "react";
import AddFolderModal from "./AddFolderModal";
import AddBookmarkModal from "./AddBookmarkModal";
import UpdateBookmarkModal from "./UpdateBookmarkModal";
import UpdateFolderModal from "./UpdateFolderModal";
import { connect } from "react-redux";

const MODAL_COMPONENTS = {
  ADD_FOLDER: AddFolderModal,
  ADD_BOOKMARK: AddBookmarkModal,
  UPDATE_FOLDER: UpdateFolderModal,
  UPDATE_BOOKMARK: UpdateBookmarkModal
};

const ModalRoot = ({ modalType, modalProps }) => {
  if (!modalType) {
    return null;
  }
  const SpecificModal = MODAL_COMPONENTS[modalType];
  return <SpecificModal {...modalProps} />;
};

export default connect(state => state.modal)(ModalRoot);
