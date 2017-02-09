import React, { PureComponent, PropTypes } from 'react';
import {
  MenuItemContainer,
  MenuItemIcon,
  AppSwitcherLink,
  FlexContainer,
} from '../styled';
import HomeIcon from './HomeIcon';

export default class HomeLink extends PureComponent {
  static propTypes = {
    analytics: PropTypes.func,
  };

  onHomeClick = () => this.props.analytics('appswitcher.home.link.click');

  render() {
    return (
      <AppSwitcherLink href="/home" onClick={this.onHomeClick}>
        <MenuItemContainer>
          <FlexContainer>
            <MenuItemIcon>
              <HomeIcon />
            </MenuItemIcon>
            <div>Home</div>
          </FlexContainer>
        </MenuItemContainer>
      </AppSwitcherLink>
    );
  }
}
