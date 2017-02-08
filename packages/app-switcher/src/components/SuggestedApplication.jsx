import React, { PureComponent, PropTypes } from 'react';
import { ConfluenceLogo, JiraLogo } from '@atlaskit/logo';

import {
  SuggestedApplicationContainer,
  SuggestedApplicationTagline,
  MenuHeader,
  MenuItemContainer,
  MenuLinkItem,
  LogoContainer,
} from '../styled';
import AppSwitcherPropTypes from '../internal/prop-types';

export default class SuggestedApplication extends PureComponent {
  static propTypes = {
    i18n: AppSwitcherPropTypes.i18n,
    analytics: PropTypes.func,
    ...AppSwitcherPropTypes.suggestedApplication,
  };

  onSuggestedApplicationClick =
    () => this.props.analytics(`appswitcher.discovery.user.select.${this.props.application}`);

  onDontShowAgainClick = () => {
    this.props.analytics('appswitcher.discovery.nothanks.button.click');
    this.props.onDontShowAgainClick();
  };

  render() {
    const logos = {
      jira: <JiraLogo />,
      confluence: <ConfluenceLogo />,
    };

    if (!this.props.show) {
      return null;
    }

    return (
      <div>
        <MenuHeader>{this.props.i18n['try.other.apps']}</MenuHeader>
        <a href={this.props.url} onClick={this.onSuggestedApplicationClick}>
          <SuggestedApplicationContainer>
            <LogoContainer>{logos[this.props.application]}</LogoContainer>
            <SuggestedApplicationTagline>
              {this.props.i18n[`suggested.application.description.${this.props.application}`]}
            </SuggestedApplicationTagline>
          </SuggestedApplicationContainer>
        </a>
        <MenuItemContainer onClick={this.onDontShowAgainClick}>
          <MenuLinkItem>{this.props.i18n["don't.show.this.again"]}</MenuLinkItem>
        </MenuItemContainer>
      </div>
    );
  }
}
