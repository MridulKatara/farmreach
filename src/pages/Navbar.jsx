import React, { useState } from 'react';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #007bff;
  color: #fff;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const SearchBar = styled.form`
  display: flex;
  flex-grow: 1;
  margin: 0 20px;
`;

const SearchInput = styled.input`
  flex-grow: 1;
  padding: 8px;
  border-radius: 4px;
  border: none;
  font-size: 1rem;
`;

const SearchButton = styled.button`
  padding: 8px 16px;
  background-color: #0056b3;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 8px;

  &:hover {
    background-color: #003d7a;
  }
`;

const HomeButton = styled.a`
  padding: 10px;
  background-color: #0056b3;
  color: #fff;
  border-radius: 4px;
  text-decoration: none;
  font-size: 1rem;

  &:hover {
    background-color: #003d7a;
  }
`;

const Navbar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <NavbarContainer>
      <Logo>CreatoRRR</Logo>
      <SearchBar onSubmit={handleSearchSubmit}>
        <SearchInput
          type="text"
          placeholder="Search by name, language, or education"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <SearchButton type="submit">Search</SearchButton>
      </SearchBar>
      <HomeButton href="/">Home</HomeButton>
    </NavbarContainer>
  );
};

export default Navbar;
