import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";

const Folder = ({ name, id }) => {
  return (
    <FolderInfo to={id}>
      <FontAwesomeIcon icon={faFolder} />
      <FolderName>{name}</FolderName>
    </FolderInfo>
  );
};

export default Folder;

const FolderName = styled.span`
  margin-left: 10px;
  text-decoration: none;
  color: black;
`;

const FolderInfo = styled(Link)`
  text-decoration: none;
  color: black;
`;
