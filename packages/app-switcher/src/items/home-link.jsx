import React from 'react';
import HomeIcon from '../components/HomeIcon';
import { HomeIconContainer, HomeLinkContainer } from '../styled';

export default function (i18n, isAnonymousUser) {
  if (isAnonymousUser) {
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
