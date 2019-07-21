import { SHOW_MODAL, HIDE_MODAL } from "../constant/actionTypes";

const initailState = {
  modalType: null,
  modalProps: {}
};

const modal = (state = initailState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        modalType: action.modalType,
        modalProps: action.modalProps
      };
    case HIDE_MODAL:
      return {
        initailState
      };
    default:
      return state;
  }
};

export default modal;
