import React, { PureComponent, PropTypes } from 'react';
import { MenuHeader, MenuItemContainer, MenuLinkItem, AppSwitcherLink } from '../styled';
import AppSwitcherPropTypes from '../internal/prop-types';

export default class ApplicationLinks extends PureComponent {
  static propTypes = {
    i18n: AppSwitcherPropTypes.i18n,
    isAnonymousUser: PropTypes.bool,
    analytics: PropTypes.func,
    ...AppSwitcherPropTypes.linkedApplications,
  };

  onConfigureClick = () => this.props.analytics('appswitcher.configure.link.click');
  onLinkedApplicationClick = product => this.props.analytics('appswitcher.app.link.click', { product });

  render() {
    const apps = this.props.error
      ? (
        <MenuItemContainer>{this.props.i18n['applinks.error']}</MenuItemContainer>
      )
      : this.props.apps.map(app => (
        <AppSwitcherLink
          href={app.url}
          key={app.url}
          onClick={() => this.onLinkedApplicationClick(app.product)}
        >
          <MenuItemContainer className="ellipsis">{app.name}</MenuItemContainer>
        </AppSwitcherLink>
     ));

    const configureLink = this.props.configureLink ?
      (
        <AppSwitcherLink href={this.props.configureLink} onClick={this.onConfigureClick}>
          <MenuItemContainer>
            <MenuLinkItem>{this.props.i18n.configure}</MenuLinkItem>
          </MenuItemContainer>
        </AppSwitcherLink>
      ) : null;

    return (
      <div>
        <MenuHeader paddingTop={!this.props.isAnonymousUser}>
          {this.props.i18n.apps}
        </MenuHeader>
        {apps}
        {configureLink}
      </div>
    );
  }
}
