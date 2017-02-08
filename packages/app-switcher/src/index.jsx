import React, { PureComponent, PropTypes } from 'react';
import { AppSwitcherContainer } from './styled';
import HomeLink from './components/HomeLink';
import RecentContainers from './components/RecentContainers';
import ApplicationLinks from './components/ApplicationLinks';
import SuggestedApplication from './components/SuggestedApplication';
import AppSwitcherPropTypes from './internal/prop-types';

export default class AppSwitcher extends PureComponent {

  static propTypes = {
    recentContainers: AppSwitcherPropTypes.recentContainers.isRequired,
    linkedApplications: AppSwitcherPropTypes.linkedApplications.isRequired,
    isAnonymousUser: PropTypes.bool.isRequired,
    suggestedApplication: AppSwitcherPropTypes.suggestedApplication.isRequired,
    i18n: AppSwitcherPropTypes.i18n.isRequired,
  };

  render = () => {
    const homeLink = this.props.isAnonymousUser ? null : (<HomeLink />);
    const recentContainers = this.props.isAnonymousUser ? null : (
      <RecentContainers
        containers={this.props.recentContainers}
        i18n={this.props.i18n}
      />
    );

    return (
      <AppSwitcherContainer>
        {homeLink}
        {recentContainers}
        <ApplicationLinks
          apps={this.props.linkedApplications.apps}
          configureLink={!this.props.isAnonymousUser && this.props.linkedApplications.configureLink}
          i18n={this.props.i18n}
          isAnonymousUser={this.props.isAnonymousUser}
          error={this.props.linkedApplications.error}
        />
        <SuggestedApplication
          show={!this.props.isAnonymousUser && this.props.suggestedApplication.show}
          application={this.props.suggestedApplication.application}
          description={this.props.suggestedApplication.description}
          url={this.props.suggestedApplication.url}
          onDontShowAgainClick={this.props.suggestedApplication.onDontShowAgainClick}
          i18n={this.props.i18n}
        />
      </AppSwitcherContainer>
    );
  }
}
