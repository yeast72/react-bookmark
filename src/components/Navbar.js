import React from "react";
import styled from "styled-components";

const NavBarContainer = styled.div`
  flex: 0.1;
  background-color: #8c8280;
`;

const Title = styled.h1`
  margin: 0;
  padding: 15px;
  color: white;
  font-size: 1.5em;
`;

const Navbar = () => (
  <NavBarContainer>
    <Title>Bookmarks</Title>
  </NavBarContainer>
);

export default Navbar;
