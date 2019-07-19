import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const Container = styled.li`
  display: flex;
  flex-direction: row;
  position: relative;
  width: 100%;
  height: 40px;
  padding-inline-start: 20px;
  align-items: center;
  box-sizing: border-box;
  background: ${props => (props.active ? "#bfada9" : "")};
  list-style-type: none;
  text-decoration: none;
  user-select: none;
`;

const MenuButtonContainer = styled.div`
  margin-inline-end: 25px;
`;

const StyledButton = styled(FontAwesomeIcon)`
  margin-inline-end: 5px;
  padding: 4px;
  transition: background-color 50ms linear;
  border-radius: 4px;
  :hover {
    background-color: #c1a594;
  }
`;

const ChildContainer = styled.div`
  flex: 1;
`;

const ChildItem = props => {
  const { type, active, OnItemClick, OnOpenBookmark } = props;
  return (
    <Container
      active={active}
      onClick={OnItemClick}
      onDoubleClick={OnOpenBookmark}
    >
      <ChildContainer>{props.children}</ChildContainer>
      <MenuButtonContainer>
        <StyledButton icon={faEdit} />
        <StyledButton icon={faTrashAlt} />
      </MenuButtonContainer>
    </Container>
  );
};

ChildItem.propsTypes = {
  type: PropTypes.string,
  active: PropTypes.bool,
  OnItemClick: PropTypes.func,
  OnOpenBookmark: PropTypes.func
};

export default ChildItem;
