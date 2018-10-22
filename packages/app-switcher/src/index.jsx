// @flow
import React, { Component } from 'react';
import AtlassianIcon from '@atlaskit/icon/glyph/atlassian';
import { DropdownMenuStateless } from '@atlaskit/dropdown-menu';

import type {
  HomeLink,
  MarketplaceLink,
  PeopleProfileLink,
  InviteUsersLink,
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
    isTrustedUser?: boolean,
    isHomeLinkEnabled: boolean,
    homeLink?: HomeLink,
    isMarketplaceLinkEnabled: boolean,
    marketplaceLink?: MarketplaceLink,
    peopleProfileLink?: PeopleProfileLink,
    inviteUsersLink?: InviteUsersLink,
    isSiteAdminLinkEnabled?: boolean,
    isPeopleProfileLinkEnabled?: boolean,
    isInviteUsersLinkEnabled?: boolean,
    i18n: Translations,
    trigger: Function,
    analytics: Function,
    isDropdownOpenInitially: boolean,
    dropdownOptions: DropdownOptions,
    isLoading: boolean,
    onAppSwitcherOpen: Function,
    onAppSwitcherClose: Function,
    links?: Links,
  };

  static defaultProps = {
    analytics: () => {},
    isTrustedUser: false,
    isDropdownOpenInitially: true,
    dropdownOptions: {},
    isHomeLinkEnabled: true,
    isMarketplaceLinkEnabled: false,
    isSiteAdminLinkEnabled: false,
    isPeopleProfileLinkEnabled: false,
    isInviteUsersLinkEnabled: false,
    isLoading: false,
    onAppSwitcherOpen: () => {},
    onAppSwitcherClose: () => {},
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
      this.props.analytics('appswitcher.trigger.opened');
      this.props.onAppSwitcherOpen();
    } else if (this.state.isDropdownOpen && !attrs.isOpen) {
      this.props.analytics('appswitcher.trigger.closed');
      this.props.onAppSwitcherClose();
    }

    this.setState({ isDropdownOpen: attrs.isOpen });
  };

  render = () => {
    const {
      i18n,
      isAnonymousUser,
      isTrustedUser,
      isHomeLinkEnabled,
      homeLink,
      isMarketplaceLinkEnabled,
      marketplaceLink,
      peopleProfileLink,
      inviteUsersLink,
      isSiteAdminLinkEnabled,
      isPeopleProfileLinkEnabled,
      isInviteUsersLinkEnabled,
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

    // Fallback to default Marketplace apps link if no `marketplaceLink` prop was passed
    const marketplaceLinkConfig : MarketplaceLink = marketplaceLink || {
      name: 'Marketplace apps',
      url: '/plugins/servlet/upm/marketplace?source=app_switcher',
    };

    // NOTE: dropdownItems here are passing content that are React elements and not strings
    // This is not the intended behaviour of DropdownMenu and could result in major issues in the
    // future. (Its what is throwing the warnings in tests too)

    const dropdownItems = [
      getTopLinks(
        i18n,
        isAnonymousUser,
        isTrustedUser,
        isHomeLinkEnabled,
        isMarketplaceLinkEnabled,
        isSiteAdminLinkEnabled,
        isPeopleProfileLinkEnabled,
        isInviteUsersLinkEnabled,
        homeLinkConfig,
        marketplaceLinkConfig,
        peopleProfileLink,
        inviteUsersLink
      ),
      getRecentContainers(i18n, isAnonymousUser, recentContainers),
      getLinkedApplications(i18n, isAnonymousUser, isTrustedUser, isSiteAdminLinkEnabled,
        linkedApplications),
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
