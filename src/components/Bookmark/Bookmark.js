import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

const Bookmark = ({ id, name, url }) => (
  <BookmarkInfo>
    <FontAwesomeIcon icon={faBookmark} />
    <BookmarkName href={url} target="_blank">
      {name} <BookmarkURL>- {url}</BookmarkURL>
    </BookmarkName>
  </BookmarkInfo>
);

export default Bookmark;

const BookmarkInfo = styled.div`
  display: inline-block;
  color: black;
`;

const BookmarkName = styled.span`
  text-decoration: none;
  color: black;
  margin-left: 10px;
`;

const BookmarkURL = styled.span`
  color: gray;
`;
