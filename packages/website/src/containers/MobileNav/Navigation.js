import React, { PropTypes, PureComponent } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Button from '@atlaskit/button';

import ComponentIcon from '@atlaskit/icon/glyph/component';
import HomeFilledIcon from '@atlaskit/icon/glyph/home-filled';
import OverviewIcon from '@atlaskit/icon/glyph/overview';
import PackageIcon from '@atlaskit/icon/glyph/bitbucket/repos';
import PageIcon from '@atlaskit/icon/glyph/page';

import components from '../../data';

const componentKeys = Object.keys(components);

const NavContainer = styled.div`
  padding: 12px 36px;
  border-bottom: 1px solid #ccc;
`;
const NavItemGroup = styled.div`
  text-transform: uppercase;
  font-weight: bold;
  color: #666;
  margin: 18px 6px 6px;
`;
const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  color: #333;
  font-size: 14px;
  margin-top: 10px;
`;
const NavIcon = styled.span`
  display: inline-block;
  min-width: 30px;
  min-height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const NavLabel = styled.span`
  display: inline-block;
  margin-left: 10px;
`;
const Footer = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;

export default class Navigation extends PureComponent {
  static propTypes = {
    onNavigate: PropTypes.func,
  }

  render() {
    return (
      <NavContainer>
        <NavLink to="/" onClick={this.props.onNavigate}>
          <NavIcon>
            <HomeFilledIcon label="Welcome icon" />
          </NavIcon>
          <NavLabel>Welcome</NavLabel>
        </NavLink>
        <NavItemGroup>Get Started</NavItemGroup>
        <NavLink to="./install" onClick={this.props.onNavigate}>
          <NavIcon>
            <OverviewIcon label="Install icon" />
          </NavIcon>
          <NavLabel>Install guide</NavLabel>
        </NavLink>
        <NavLink to="./components" onClick={this.props.onNavigate}>
          <NavIcon>
            <ComponentIcon label="Components icon" />
          </NavIcon>
          <NavLabel>All Components</NavLabel>
        </NavLink>
        <NavLink to="http://go.atlassian.com/reduced-ui-pack" target="_new" onClick={this.props.onNavigate}>
          <NavIcon>
            <PageIcon label="More icon" />
          </NavIcon>
          <NavLabel>Reduced UI pack</NavLabel>
        </NavLink>
        <NavItemGroup>Components</NavItemGroup>
        {componentKeys.map((key) => {
          const component = components[key];
          const url = `/components/${key}`;
          return (
            <NavLink to={url} key={key} onClick={this.props.onNavigate}>
              <NavIcon>
                <PackageIcon size="small" label={`${component.name} icon`} />
              </NavIcon>
              <NavLabel>{component.name}</NavLabel>
            </NavLink>
          );
        })}
        <Footer>
          <Button onClick={this.props.onNavigate}>Close Nav</Button>
        </Footer>
      </NavContainer>
    );
  }
}
