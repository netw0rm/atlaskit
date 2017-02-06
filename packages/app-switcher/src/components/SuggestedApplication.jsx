import React, { PureComponent } from 'react';
import {
  SuggestedApplicationContainer,
  SuggestedApplicationTagline,
  MenuHeader,
  MenuItemContainer,
  MenuLinkItem,
} from '../styled';
import jiraLogo from '../img/jira.png';
import confluenceLogo from '../img/confluence.png';
import AppSwitcherPropTypes from '../internal/prop-types';

export default class SuggestedApplication extends PureComponent {
  static propTypes = {
    i18n: AppSwitcherPropTypes.i18n,
    ...AppSwitcherPropTypes.suggestedApplication,
  };

  render() {
    const logos = {
      jira: jiraLogo,
      confluence: confluenceLogo,
    };

    if (!this.props.show) {
      return null;
    }

    return (
      <div>
        <MenuHeader>{this.props.i18n['try.other.apps']}</MenuHeader>
        <a href={this.props.url}>
          <SuggestedApplicationContainer>
            <img src={logos[this.props.application]} alt={this.props.application} height="20px" />
            <SuggestedApplicationTagline>{this.props.description}</SuggestedApplicationTagline>
          </SuggestedApplicationContainer>
        </a>
        <MenuItemContainer onClick={this.props.onDontShowAgainClick}>
          <MenuLinkItem>{this.props.i18n["don't.show.this.again"]}</MenuLinkItem>
        </MenuItemContainer>
      </div>
    );
  }
}
