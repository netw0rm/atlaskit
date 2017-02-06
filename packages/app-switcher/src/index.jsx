import React, { PureComponent } from 'react';
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
    suggestedApplication: AppSwitcherPropTypes.suggestedApplication.isRequired,
    i18n: AppSwitcherPropTypes.i18n.isRequired,
  };

  render = () => (
    <AppSwitcherContainer>
      <HomeLink />
      <RecentContainers
        containers={this.props.recentContainers}
      />
      <ApplicationLinks
        apps={this.props.linkedApplications.apps}
        configureLink={this.props.linkedApplications.configureLink}
        i18n={this.props.i18n}
      />
      <SuggestedApplication
        show={this.props.suggestedApplication.show}
        application={this.props.suggestedApplication.application}
        description={this.props.suggestedApplication.description}
        url={this.props.suggestedApplication.url}
        onDontShowAgainClick={this.props.suggestedApplication.onDontShowAgainClick}
        i18n={this.props.i18n}
      />
    </AppSwitcherContainer>
  )
}
