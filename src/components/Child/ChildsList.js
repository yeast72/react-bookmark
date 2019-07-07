import React from "react";
import styled from "styled-components";

const ChildsListContainer = styled.div`
  box-shadow: rgba(60, 64, 67, 0.3) 0px;
  border-radius: 10px;
  background-color: #e7e9e7;
  margin: 0 auto;
  padding: 8px 0;
  max-width: 960px;
`;

const ChildsList = ({ title, children }) => {
  return (
    <ChildsListContainer>
      <h1>{title}</h1>
      {children}
    </ChildsListContainer>
  );
};

export default ChildsList;
