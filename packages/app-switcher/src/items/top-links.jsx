// @flow
import React from 'react';
import SiteAdminIcon from '../components/SiteAdminIcon';
import { HomeIconContainer, SiteAdminIconContainer, TopLinkContainer } from '../styled';
import type { HomeLink, Translations, DropdownConfig } from '../internal/types';

export default function (
  i18n: Translations,
  isAnonymousUser: boolean,
  isHomeLinkEnabled: boolean,
  isSiteAdminLinkEnabled?: boolean,
  homeLink: HomeLink,
): DropdownConfig | null {
  if (isAnonymousUser) {
    return null;
  }

  const items = [];

  if (isHomeLinkEnabled) {
    items.push({
      content: (<TopLinkContainer>{homeLink.name}</TopLinkContainer>),
      elemBefore: (<HomeIconContainer>{homeLink.icon}</HomeIconContainer>),
      href: homeLink.url,
      analyticEvent: { key: 'appswitcher.home.link.click' },
    });
  }

  if (isSiteAdminLinkEnabled) {
    items.push({
      content: (<TopLinkContainer>{i18n['site-admin']}</TopLinkContainer>),
      elemBefore: (<SiteAdminIconContainer><SiteAdminIcon /></SiteAdminIconContainer>),
      href: '/admin',
      analyticEvent: { key: 'appswitcher.siteAdmin.link.click' },
    });
  }

  return items.length > 0 ? { items } : null;
}
