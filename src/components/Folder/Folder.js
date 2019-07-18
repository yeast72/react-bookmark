import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";

const Folder = ({ name, id }) => {
  return (
    <Container to={id}>
      <FontAwesomeIcon icon={faFolder} />
      <FolderName>{name}</FolderName>
    </Container>
  );
};

export default Folder;

const FolderName = styled.div`
  display: inline;
  margin-left: 10px;
  text-decoration: none;
`;

const Container = styled.div`
  text-decoration: none;
`;
