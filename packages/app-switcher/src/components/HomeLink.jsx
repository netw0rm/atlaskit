import React, { PureComponent } from 'react';
import { MenuItemContainer, MenuItemIcon } from '../styled';
import HomeIcon from './HomeIcon';

export default class HomeLink extends PureComponent {
  render() {
    return (
      <a href="/home">
        <MenuItemContainer>
          <MenuItemIcon>
            <HomeIcon />
          </MenuItemIcon>
          <div>Home</div>
        </MenuItemContainer>
      </a>
    );
  }
}
