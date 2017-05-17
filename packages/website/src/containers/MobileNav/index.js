import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { akColorN0, akColorB500, akGridSizeUnitless } from '@atlaskit/util-shared-styles';
import { Link } from 'react-router-dom';
import MenuIcon from '@atlaskit/icon/glyph/menu';
import CancelIcon from '@atlaskit/icon/glyph/cancel';

import Navigation from './Navigation';
import atlasKitLogo from '../../images/atlaskit-logo.png';

const HeaderLink = styled(Link)`
  display: flex;
  align-items: center;
  margin-left: 10px;
  color: inherit !important;
`;

const Logo = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 4px;
  display: inline-block;
`;

const Header = styled.span`
  display: inline-block;
  font-size: 20px;
  margin: 10px;
`;

const NavBar = styled.div`
  display: flex;
  align-items: center;
  width: 100vw;
  background-color: ${akColorB500};
  color: ${akColorN0};
  border-bottom: 1px solid rgba(9, 30, 66, 0.36);
  padding: ${akGridSizeUnitless}px;
  box-sizing: border-box;
`;

export default class MobileNavigation extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      navIsOpen: false,
    };
  }

  toggleNav = (e) => {
    e.preventDefault();
    const { navIsOpen } = this.state;
    this.setState({
      navIsOpen: !navIsOpen,
    });
  }

  closeNav = () => {
    window.scrollTo(0, 0);
    this.setState({
      navIsOpen: false,
    });
  }

  render() {
    const { navIsOpen } = this.state;
    return (
      <div>
        <NavBar>
          <Link onClick={this.toggleNav} style={{ color: 'inherit' }} to="/">
            {navIsOpen
              ? <CancelIcon label="Close Navigation" size="medium" />
              : <MenuIcon label="Open Navigation" size="medium" />
            }
          </Link>
          <HeaderLink to="/">
            <Logo alt="AtlasKit Logo" src={atlasKitLogo} />
            <Header>AtlasKit</Header>
          </HeaderLink>
        </NavBar>
        {navIsOpen ? <Navigation onNavigate={this.closeNav} /> : null}
      </div>
    );
  }
}
