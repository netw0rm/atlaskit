import React, { PureComponent } from 'react';
import {
  MenuItemContainer,
  MenuItemIcon,
  MenuItemTwoLineContent,
  MenuHeader,
  AppSwitcherLink,
  FlexContainer,
} from '../styled';
import AppSwitcherPropTypes from '../internal/prop-types';

export default class RecentContainers extends PureComponent {
  static propTypes = {
    containers: AppSwitcherPropTypes.recentContainers,
    i18n: AppSwitcherPropTypes.i18n,
  };

  item = container => (
    <AppSwitcherLink href={container.url} key={container.url}>
      <MenuItemContainer>
        <FlexContainer>
          <MenuItemIcon>
            <img src={container.iconUrl} alt={container.name} className="menuItemIcon" />
          </MenuItemIcon>
          <MenuItemTwoLineContent className="ellipsis">
            <div className="ellipsis top">{container.name}</div>
            <div className="bottom">{this.props.i18n[`container.${container.type}`]}</div>
          </MenuItemTwoLineContent>
        </FlexContainer>
      </MenuItemContainer>
    </AppSwitcherLink>
  );

  render() {
    if (this.props.containers.length === 0) {
      return null;
    }

    const items = this.props.containers.map(this.item);

    return (
      <div>
        <MenuHeader>Recent</MenuHeader>
        {items}
      </div>
    );
  }
}
