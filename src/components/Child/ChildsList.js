import React from "react";
import styled from "styled-components";

const Container = styled.div`
  box-shadow: rgba(60, 64, 67, 0.3) 0px;
  border-radius: 5px;
  background-color: #e7e9e7;
  margin: 10px auto;
  padding: 8px 0;
  max-width: 960px;
`;

const ChildsList = ({ children }) => {
  return <Container>{children}</Container>;
};

export default ChildsList;
