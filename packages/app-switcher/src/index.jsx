import React, { Component, PropTypes } from 'react';
import { StatelessDropdownMenu } from '@atlaskit/dropdown-menu';

import AppSwitcherPropTypes from './internal/prop-types';

import getHomeLink from './items/home-link';
import getRecentContainers from './items/recent-containers';
import getLinkedApplications from './items/linked-applications';
import getSuggestedApplication from './items/suggested-application';

export default class AppSwitcher extends Component {

  static propTypes = {
    recentContainers: AppSwitcherPropTypes.recentContainers.isRequired,
    linkedApplications: AppSwitcherPropTypes.linkedApplications.isRequired,
    isAnonymousUser: PropTypes.bool.isRequired,
    isHomeLinkEnabled: PropTypes.bool,
    suggestedApplication: AppSwitcherPropTypes.suggestedApplication.isRequired,
    i18n: AppSwitcherPropTypes.i18n.isRequired,
    trigger: PropTypes.func.isRequired,
    analytics: PropTypes.func,
    isDropdownOpenInitially: PropTypes.bool,
    dropdownOptions: AppSwitcherPropTypes.dropdownOptions,
  };

  static defaultProps = {
    analytics: () => {},
    isDropdownOpenInitially: true,
    dropdownOptions: {},
    isHomeLinkEnabled: true,
  };

  constructor(props) {
    super(props);

    this.state = {
      isDropdownOpen: props.isDropdownOpenInitially,
      suggestedApplicationHiddenByUser: false,
    };
  }

  onItemActivated = ({ item }) => {
    if (item.analyticEvent) {
      this.props.analytics(item.analyticEvent.key, item.analyticEvent.properties);
    }

    if (item.action === 'suggestedApplicationDontShowAgainClick') {
      // If we remove the suggested application immediately, the droplist component interprets the
      // click as outside the dropdown menu and closes the menu, which isn't the behaviour we want.
      setTimeout(() => this.setState({ suggestedApplicationHiddenByUser: true }), 0);
      this.props.suggestedApplication.onDontShowAgainClick();
    }
  };

  onOpenChange = (attrs) => {
    if (!this.state.isDropdownOpen && attrs.isOpen) {
      this.props.analytics('appswitcher.trigger.click');
    }

    this.setState({ isDropdownOpen: attrs.isOpen });
  };

  render = () => {
    const {
      i18n,
      isAnonymousUser,
      isHomeLinkEnabled,
      recentContainers,
      linkedApplications,
      suggestedApplication,
      trigger,
      dropdownOptions,
    } = this.props;

    const dropdownItems = [
      getHomeLink(i18n, isAnonymousUser, isHomeLinkEnabled),
      getRecentContainers(i18n, isAnonymousUser, recentContainers),
      getLinkedApplications(i18n, isAnonymousUser, linkedApplications),
      getSuggestedApplication(i18n, isAnonymousUser, suggestedApplication,
        this.state.suggestedApplicationHiddenByUser),
    ].filter(item => item != null);

    return (
      <StatelessDropdownMenu
        items={dropdownItems}
        isOpen={this.state.isDropdownOpen}
        onOpenChange={this.onOpenChange}
        onItemActivated={this.onItemActivated}
        appearance="default"
        position="bottom left"
        shouldFlip={false}
        {...dropdownOptions}
      >
        {trigger(this.state.isDropdownOpen)}
      </StatelessDropdownMenu>
    );
  }
}
