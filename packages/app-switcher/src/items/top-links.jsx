// @flow
import React from 'react';
import SiteAdminIcon from '../components/SiteAdminIcon';
import {
  HomeIconContainer,
  MarketplaceIconContainer,
  PeopleDirectoryIconContainer,
  SiteAdminIconContainer,
  TopLinkContainer,
} from '../styled';
import type {
  HomeLink,
  MarketplaceLink,
  Translations,
  DropdownConfig,
  PeopleProfileLink,
} from '../internal/types';
import MarketplaceIcon from '../components/MarketplaceIcon';

export default function (
  i18n: Translations,
  isAnonymousUser: boolean,
  isTrustedUser: boolean,
  isHomeLinkEnabled: boolean,
  isMarketplaceLinkEnabled: boolean,
  isSiteAdminLinkEnabled?: boolean,
  isPeopleProfileLinkEnabled?: boolean,
  homeLink: HomeLink,
  marketplaceLink: MarketplaceLink,
  peopleProfileLink: PeopleProfileLink,
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

  if (isSiteAdminLinkEnabled) {
    items.push({
      content: <TopLinkContainer>{i18n['site-admin']}</TopLinkContainer>,
      elemBefore: (
        <SiteAdminIconContainer>
          <SiteAdminIcon />
        </SiteAdminIconContainer>
      ),
      href: isTrustedUser ? '/trusted-admin/billing/addapplication' : '/admin',
      analyticEvent: {
        key: 'appswitcher.siteAdmin.link.click',
        properties: {
          isSiteAdmin: isSiteAdminLinkEnabled,
        },
      },
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
