import React, { PureComponent } from 'react';
import { MenuItemContainer, MenuItemIcon, MenuItemTwoLineContent, MenuHeader } from '../styled';
import AppSwitcherPropTypes from '../internal/prop-types';

export default class RecentContainers extends PureComponent {
  static propTypes = {
    containers: AppSwitcherPropTypes.recentContainers,
  };

  static item(container) {
    return (
      <a href={container.url} key={container.url}>
        <MenuItemContainer>
          <MenuItemIcon>
            <img src={container.iconUrl} alt={container.name} />
          </MenuItemIcon>
          <MenuItemTwoLineContent>
            <div>{container.name}</div>
            <div>{container.type}</div>
          </MenuItemTwoLineContent>
        </MenuItemContainer>
      </a>
    );
  }

  render() {
    if (this.props.containers.length === 0) {
      return null;
    }

    const items = this.props.containers.map(RecentContainers.item);

    return (
      <div>
        <MenuHeader>Recent</MenuHeader>
        {items}
      </div>
    );
  }
}
