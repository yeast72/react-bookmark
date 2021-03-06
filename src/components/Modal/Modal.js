import React, { Component } from "react";
import styled from "styled-components";
import ReactDom from "react-dom";

const modalRoot = document.getElementById("modal");

const ModalContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  margin: 20px;
`;

const ModalBox = styled.div`
  background-color: #e7e9e7;
  border-radius: 20px;
  display: block;
  width: 450px;
  height: 300px;
`;

class Modal extends Component {
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
    this.handleClickOutsideBox = this.handleClickOutsideBox.bind(this);
  }

  handleClickOutsideBox(e) {
    e.stopPropagation();
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    const { title } = this.props;
    const element = (
      <ModalContainer onClick={this.handleClickOutsideBox}>
        <ModalBox>
          <ModalContent>
            <h1> {title} </h1> <div> {this.props.children} </div>{" "}
          </ModalContent>{" "}
        </ModalBox>{" "}
      </ModalContainer>
    );

    return ReactDom.createPortal(element, this.el);
  }
}

export default Modal;
