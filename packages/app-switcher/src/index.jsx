// @flow
import React, { Component } from 'react';
import AtlassianIcon from '@atlaskit/icon/glyph/atlassian';
import { DropdownMenuStateless } from '@atlaskit/dropdown-menu';

import type {
  HomeLink,
  RecentContainers,
  LinkedApplications,
  DropdownOptions,
  Translations,
  DropdownItem,
  Links,
} from './internal/types';

import getTopLinks from './items/top-links';
import getRecentContainers from './items/recent-containers';
import getLinkedApplications from './items/linked-applications';
import getLinks from './items/links';

import { AppSwitcherContainer } from './styled';

export default class AppSwitcher extends Component {
  props: { // eslint-disable-line react/sort-comp
    recentContainers: RecentContainers,
    linkedApplications: LinkedApplications,
    isAnonymousUser: boolean,
    isHomeLinkEnabled: boolean,
    homeLink?: HomeLink,
    isSiteAdminLinkEnabled?: boolean,
    i18n: Translations,
    trigger: Function,
    analytics: Function,
    isDropdownOpenInitially: boolean,
    dropdownOptions: DropdownOptions,
    isLoading: boolean,
    onAppSwitcherOpen: Function,
    links?: Links,
  };

  static defaultProps = {
    analytics: () => {},
    isDropdownOpenInitially: true,
    dropdownOptions: {},
    isHomeLinkEnabled: true,
    isSiteAdminLinkEnabled: false,
    isLoading: false,
    onAppSwitcherOpen: () => {},
    suggestedApplication: { onDontShowAgainClick: () => {} },
    links: [],
  };

  state = {
    isDropdownOpen: this.props.isDropdownOpenInitially,
  };

  onItemActivated = (activated: { item: DropdownItem }) => {
    if (activated.item.analyticEvent) {
      this.props.analytics(
        activated.item.analyticEvent.key,
        activated.item.analyticEvent.properties
      );
    }
    if (typeof activated.item.onClick === 'function') {
      setTimeout(activated.item.onClick, 0);
      this.setState({ isDropdownOpen: false });
    }
  };

  onOpenChange = (attrs: { isOpen: boolean }) => {
    if (!this.state.isDropdownOpen && attrs.isOpen) {
      this.props.analytics('appswitcher.trigger.click');
      this.props.onAppSwitcherOpen();
    }

    this.setState({ isDropdownOpen: attrs.isOpen });
  };

  render = () => {
    const {
      i18n,
      isAnonymousUser,
      isHomeLinkEnabled,
      homeLink,
      isSiteAdminLinkEnabled,
      isLoading,
      recentContainers,
      linkedApplications,
      links,
      trigger,
      dropdownOptions,
    } = this.props;

    // Fallback to default Home link if no `homeLink` prop was passed
    const homeLinkConfig : HomeLink = homeLink || {
      name: this.props.i18n.home,
      icon: <AtlassianIcon size="large" label="" />,
      url: '/home',
    };

    // NOTE: dropdownItems here are passing content that are React elements and not strings
    // This is not the intended behaviour of DropdownMenu and could result in major issues in the
    // future. (Its what is throwing the warnings in tests too)

    const dropdownItems = [
      getTopLinks(i18n, isAnonymousUser, isHomeLinkEnabled, isSiteAdminLinkEnabled, homeLinkConfig),
      getRecentContainers(i18n, isAnonymousUser, recentContainers),
      getLinkedApplications(i18n, isAnonymousUser, isSiteAdminLinkEnabled, linkedApplications),
      getLinks(links),
    ].filter(item => item != null);

    return (
      <AppSwitcherContainer>
        <DropdownMenuStateless
          items={dropdownItems}
          isLoading={isLoading}
          isOpen={this.state.isDropdownOpen}
          onOpenChange={this.onOpenChange}
          onItemActivated={this.onItemActivated}
          appearance="tall"
          position="bottom left"
          shouldFlip={false}
          {...dropdownOptions}
        >
          {trigger(this.state.isDropdownOpen)}
        </DropdownMenuStateless>
      </AppSwitcherContainer>
    );
  }
}
