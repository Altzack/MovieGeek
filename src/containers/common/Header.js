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
  padding: 8px 12px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  min-height: 60px;
  position: fixed;
  width: 100vw;
  font-family: Rubik;
  z-index: 99;
  color: #fff;
  background-color: rgb(27, 29, 30);
`;

const FooterSeparator = styled.span`
  padding: 0 10px;
  margin-top: 2px;
  color: #364966;
`;

const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  width: 33%;
  color: #fff;
`;

const HeaderContentContainer = styled.div`
  font-family: Rubik;
  font-weight: 500;
  max-width: 1200px;
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
  height: 44px;
`;

const StyledTitle = styled.h1`
  color: #fff;
  margin-bottom: 0;
  letter-spacing: 3px;
  font-size: 22px;
  font-family: Rubik;
`;

const LogoLink = styled(Link)`
  justify-self: center;
  align-self: center;
  color: #364966;
  font-size: 15px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  margin: 0 10px;
  font-size: 14px;
  &:hover {
    color: #1890ff;
  }
`;

export default function Header() {
  const [visible, setVisible] = useState(false);
  const [mobileSearchVisible, setMobileSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const history = useHistory();

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleSearch = (value) => {
    if (value.trim()) {
      history.push(`/search?query=${value.trim()}`);
      setMobileSearchVisible(false); // Close the mobile search bar after searching
    }
  };

  return (
    <AppHeaderContainer>
      {/* Desktop Header */}
      <BigScreenOnly>
        <HeaderContentContainer>
          <HeaderSection style={{ justifyContent: 'flex-start' }}>
            <StyledLink to="/movies">Movies</StyledLink>
            <FooterSeparator />
            <StyledLink to="/tv">TV</StyledLink>
          </HeaderSection>
          <HeaderSection style={{ justifyContent: 'center' }}>
            <LogoLink to="/">
              <StyledTitle>TrustFam</StyledTitle>
            </LogoLink>
          </HeaderSection>
          <HeaderSection style={{ justifyContent: 'flex-end' }}>
            <Search
              placeholder="Search for movies or TV shows"
              allowClear
              enterButton={<SearchOutlined />}
              size="middle"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onSearch={handleSearch}
              style={{ width: '80%' }}
            />
          </HeaderSection>
        </HeaderContentContainer>
      </BigScreenOnly>

      {/* Mobile Header */}
      <SmallScreenOnly>
        <HeaderContentContainer>
          <HeaderSection style={{ justifyContent: 'flex-start' }}>
            <Button
              style={{
                borderColor: 'transparent',
                backgroundColor: 'transparent',
                color: '#364966',
              }}
              type="text"
              onClick={showDrawer}
            >
              <MenuOutlined />
            </Button>
          </HeaderSection>
          <HeaderSection style={{ justifyContent: 'center' }}>
            <LogoLink to="/">
              <StyledTitle>TrustFam</StyledTitle>
            </LogoLink>
          </HeaderSection>
          <HeaderSection style={{ justifyContent: 'flex-end' }}>
            {mobileSearchVisible ? (
              <Search
                placeholder="Search"
                allowClear
                enterButton={<SearchOutlined />}
                size="small"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onSearch={handleSearch}
                style={{ width: '100%' }}
              />
            ) : (
              <Button
                icon={<SearchOutlined />}
                style={{
                  color: '#fff',
                  background: 'transparent',
                  border: 'none',
                }}
                onClick={() => setMobileSearchVisible(true)}
              />
            )}
          </HeaderSection>
        </HeaderContentContainer>
        <Drawer
          placement="left"
          closable
          onClose={onClose}
          visible={visible}
          key="AppHeader-left-drawer"
        >
          <Link
            onClick={onClose}
            style={{ textDecoration: 'none', color: '#000' }}
            to="/movies"
          >
            <h3>Movies</h3>
          </Link>
          <Link
            onClick={onClose}
            style={{ textDecoration: 'none', color: '#000' }}
            to="/tv"
          >
            <h3>TV</h3>
          </Link>
        </Drawer>
      </SmallScreenOnly>
    </AppHeaderContainer>
  );
}
