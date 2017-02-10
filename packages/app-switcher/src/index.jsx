import React, { Component, PropTypes } from 'react';
import { AppSwitcherContainer } from './styled';
import HomeLink from './components/HomeLink';
import RecentContainers from './components/RecentContainers';
import ApplicationLinks from './components/ApplicationLinks';
import SuggestedApplication from './components/SuggestedApplication';
import AppSwitcherPropTypes from './internal/prop-types';

export default class AppSwitcher extends Component {

  static propTypes = {
    recentContainers: AppSwitcherPropTypes.recentContainers.isRequired,
    linkedApplications: AppSwitcherPropTypes.linkedApplications.isRequired,
    isAnonymousUser: PropTypes.bool.isRequired,
    suggestedApplication: AppSwitcherPropTypes.suggestedApplication.isRequired,
    i18n: AppSwitcherPropTypes.i18n.isRequired,
    analytics: PropTypes.func,
  };

  static defaultProps = {
    analytics: () => {},
  };

  render = () => {
    const homeLink = this.props.isAnonymousUser
      ? null
      : (<HomeLink analytics={this.props.analytics} />);

    const recentContainers = this.props.isAnonymousUser
      ? null
      : (
        <RecentContainers
          containers={this.props.recentContainers}
          i18n={this.props.i18n}
          analytics={this.props.analytics}
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
          analytics={this.props.analytics}
        />
        <SuggestedApplication
          show={!this.props.isAnonymousUser && this.props.suggestedApplication.show}
          application={this.props.suggestedApplication.application}
          description={this.props.suggestedApplication.description}
          url={this.props.suggestedApplication.url}
          onDontShowAgainClick={this.props.suggestedApplication.onDontShowAgainClick}
          i18n={this.props.i18n}
          analytics={this.props.analytics}
        />
      </AppSwitcherContainer>
    );
  }
}
