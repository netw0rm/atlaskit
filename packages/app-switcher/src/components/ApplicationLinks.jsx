import React, { PureComponent, PropTypes } from 'react';
import { MenuHeader, MenuItemContainer, MenuLinkItem } from '../styled';
import AppSwitcherPropTypes from '../internal/prop-types';

export default class ApplicationLinks extends PureComponent {
  static propTypes = {
    apps: AppSwitcherPropTypes.applications,
    i18n: AppSwitcherPropTypes.i18n,
    configureLink: PropTypes.string,
    isAnonymousUser: PropTypes.bool,
  };

  render() {
    const apps = this.props.apps.map(app => (
      <a href={app.url} key={app.url}>
        <MenuItemContainer>
          <div>{app.name}</div>
        </MenuItemContainer>
      </a>
    ));

    const configureLink = this.props.configureLink ?
      (
        <a href={this.props.configureLink}>
          <MenuItemContainer>
            <MenuLinkItem>{this.props.i18n.configure}</MenuLinkItem>
          </MenuItemContainer>
        </a>
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
