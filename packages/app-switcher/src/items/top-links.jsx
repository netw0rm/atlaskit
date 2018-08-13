// @flow
import React from 'react';
import SiteAdminIcon from '../components/SiteAdminIcon';
import {
  HomeIconContainer,
  MarketplaceIconContainer,
  PeopleDirectoryIconContainer,
  InviteUsersIconContainer,
  SiteAdminIconContainer,
  TopLinkContainer,
} from '../styled';
import type {
  HomeLink,
  MarketplaceLink,
  Translations,
  DropdownConfig,
  PeopleProfileLink,
  InviteUsersLink,
} from '../internal/types';
import MarketplaceIcon from '../components/MarketplaceIcon';

export default function (
  i18n: Translations,
  isAnonymousUser: boolean,
  isHomeLinkEnabled: boolean,
  isMarketplaceLinkEnabled: boolean,
  isSiteAdminLinkEnabled?: boolean,
  isPeopleProfileLinkEnabled?: boolean,
  isInviteUsersLinkEnabled?: boolean,
  homeLink: HomeLink,
  marketplaceLink: MarketplaceLink,
  peopleProfileLink: PeopleProfileLink,
  inviteUsersLink: InviteUsersLink
): DropdownConfig | null {
  if (isAnonymousUser) {
    return null;
  }

  const items = [];

  if (isHomeLinkEnabled) {
    items.push({
      content: <TopLinkContainer>{homeLink.name}</TopLinkContainer>,
      elemBefore: <HomeIconContainer>{homeLink.icon}</HomeIconContainer>,
      href: homeLink.url,
      analyticEvent: { key: 'appswitcher.home.link.click' },
    });
  }

  if (isPeopleProfileLinkEnabled) {
    items.push({
      content: <TopLinkContainer>{peopleProfileLink.name}</TopLinkContainer>,
      elemBefore: (
        <PeopleDirectoryIconContainer>{peopleProfileLink.icon}</PeopleDirectoryIconContainer>
      ),
      href: peopleProfileLink.url,
      analyticEvent: { key: 'appswitcher.peopleProfile.link.click' },
    });
  }

  if (isInviteUsersLinkEnabled) {
    items.push({
      content: <TopLinkContainer>{inviteUsersLink.name}</TopLinkContainer>,
      elemBefore: <InviteUsersIconContainer>{inviteUsersLink.icon}</InviteUsersIconContainer>,
      href: inviteUsersLink.url,
      analyticEvent: { key: 'appswitcher.invite.users.link.click' },
    });
  }

  if (isSiteAdminLinkEnabled) {
    items.push({
      content: <TopLinkContainer>{i18n['site-admin']}</TopLinkContainer>,
      elemBefore: (
        <SiteAdminIconContainer>
          <SiteAdminIcon />
        </SiteAdminIconContainer>
      ),
      href: '/admin',
      analyticEvent: { key: 'appswitcher.siteAdmin.link.click' },
    });
  }

  if (isMarketplaceLinkEnabled) {
    items.push({
      content: <TopLinkContainer>{marketplaceLink.name}</TopLinkContainer>,
      elemBefore: (
        <MarketplaceIconContainer>
          <MarketplaceIcon />
        </MarketplaceIconContainer>
      ),
      href: marketplaceLink.url,
      analyticEvent: { key: 'appswitcher.marketplace.link.click' },
    });
  }

  return items.length > 0 ? { items } : null;
}
