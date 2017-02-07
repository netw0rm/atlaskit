import React, { PureComponent } from 'react';
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
    ...AppSwitcherPropTypes.suggestedApplication,
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
        <a href={this.props.url}>
          <SuggestedApplicationContainer>
            <LogoContainer>{logos[this.props.application]}</LogoContainer>
            <SuggestedApplicationTagline>
              {this.props.i18n[`suggested.application.description.${this.props.application}`]}
            </SuggestedApplicationTagline>
          </SuggestedApplicationContainer>
        </a>
        <MenuItemContainer onClick={this.props.onDontShowAgainClick}>
          <MenuLinkItem>{this.props.i18n["don't.show.this.again"]}</MenuLinkItem>
        </MenuItemContainer>
      </div>
    );
  }
}
