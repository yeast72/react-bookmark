import React from "react";
import styled from "styled-components";

const FoldersListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 8px 3px 0 3px;
  user-select: none;
  background-color: #e7e9e7;
`;

const FoldersList = props => {
  const { title, children } = props;
  return (
    <FoldersListContainer>
      <div>{children}</div>
    </FoldersListContainer>
  );
};

export default FoldersList;
