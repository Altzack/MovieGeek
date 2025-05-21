import styled from 'styled-components/macro';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Drawer, Button, Input } from 'antd';
import { MenuOutlined, SearchOutlined, CloseOutlined } from '@ant-design/icons';
import { BigScreenOnly, SmallScreenOnly } from './responsiveComponents';
import 'antd/dist/antd.css';
import '../../App.css';

const { Search } = Input;

const AppHeaderContainer = styled.div`
  padding: 10px 20px;
  background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
  color: #fff;
  position: fixed;
  width: 100vw;
  z-index: 99;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const HeaderContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
`;

const LogoLink = styled(Link)`
  text-decoration: none;
  font-family: 'Rubik', sans-serif;
  font-size: 28px;
  color: #fff;
  font-weight: bold;
  letter-spacing: 2px;

  &:hover {
    color: #e50914;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 16px;
  color: #fff;
  padding: 10px 15px;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    color: #e50914;
  }
`;

const MobileMenuButton = styled(Button)`
  border: none;
  background: transparent;
  color: #fff;

  &:hover {
    color: #e50914;
  }
`;

const MobileDrawer = styled(Drawer)`
  .ant-drawer-content {
    background-color: #1b1d1e;
    color: #fff;
  }

  .ant-drawer-header {
    background-color: #1b1d1e;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileSearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 10px 15px;
  border-radius: 5px;
`;

const SearchInput = styled(Search)`
  .ant-input {
    border-radius: 5px;
    transition: box-shadow 0.3s;

    &:focus {
      box-shadow: 0 0 10px rgba(229, 9, 20, 0.7);
    }
  }

  .ant-btn {
    border-radius: 5px;
    background-color: #e50914;
    border: none;

    &:hover {
      background-color: #b20710;
    }
  }
`;

export default function Header() {
  const [visible, setVisible] = useState(false);
  const [mobileSearchVisible, setMobileSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const history = useHistory();

  const showDrawer = () => setVisible(true);

  const onClose = () => setVisible(false);

  const handleSearch = (value) => {
    if (value.trim()) {
      history.push(`/search?query=${value.trim()}`);
      setMobileSearchVisible(false);
    }
  };

  return (
    <AppHeaderContainer>
      <HeaderContentContainer>
        {/* Logo */}
        <LogoLink to="/">MovieGeek</LogoLink>

        {/* Desktop Nav Links */}
        <NavLinks>
          <StyledLink to="/movies">Movies</StyledLink>
          <StyledLink to="/tv">TV</StyledLink>
        </NavLinks>

        {/* Desktop Search */}
        <SearchContainer>
          <SearchInput
            placeholder="Search for movies or TV shows"
            allowClear
            enterButton={<SearchOutlined />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onSearch={handleSearch}
            style={{ width: 250 }}
          />
        </SearchContainer>

        {/* Mobile Menu */}
        <SmallScreenOnly>
          {mobileSearchVisible ? (
            <MobileSearchContainer>
              <SearchInput
                placeholder="Search"
                allowClear
                enterButton={<SearchOutlined />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onSearch={handleSearch}
                style={{ flex: 1 }}
              />
              <Button
                icon={<CloseOutlined />}
                style={{
                  background: 'transparent',
                  color: '#fff',
                  marginLeft: '10px',
                }}
                onClick={() => setMobileSearchVisible(false)}
              />
            </MobileSearchContainer>
          ) : (
            <div style={{ display: 'flex', gap: '10px' }}>
              <Button
                icon={<SearchOutlined />}
                style={{
                  background: 'transparent',
                  color: '#fff',
                }}
                onClick={() => setMobileSearchVisible(true)}
              />
              <MobileMenuButton icon={<MenuOutlined />} onClick={showDrawer} />
            </div>
          )}
        </SmallScreenOnly>
      </HeaderContentContainer>

      {/* Mobile Drawer */}
      <MobileDrawer
        placement="left"
        closable
        onClose={onClose}
        visible={visible}
      >
        <StyledLink to="/movies" onClick={onClose}>
          Movies
        </StyledLink>
        <StyledLink to="/tv" onClick={onClose}>
          TV
        </StyledLink>
      </MobileDrawer>
    </AppHeaderContainer>
  );
}
