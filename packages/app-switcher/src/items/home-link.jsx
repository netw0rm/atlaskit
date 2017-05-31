// @flow
import React from 'react';
import HomeIcon from '../components/HomeIcon';
import { HomeIconContainer, HomeLinkContainer } from '../styled';
import type { Translations, DropdownConfig } from '../internal/types';

export default function (
  i18n: Translations,
  isAnonymousUser: boolean,
  isHomeLinkEnabled: boolean
): DropdownConfig | null {
  if (isAnonymousUser || !isHomeLinkEnabled) {
    return null;
  }

  return {
    items: [
      {
        content: (<HomeLinkContainer>{i18n.home}</HomeLinkContainer>),
        elemBefore: (<HomeIconContainer><HomeIcon /></HomeIconContainer>),
        href: '/home',
        analyticEvent: { key: 'appswitcher.home.link.click' },
      },
    ],
  };
}
