import React from 'react';
import HomeIcon from '../components/HomeIcon';
import { HomeLinkContainer } from '../styled';

export default function (i18n, isAnonymousUser) {
  if (isAnonymousUser) {
    return null;
  }

  return {
    items: [
      {
        content: (<HomeLinkContainer>{i18n.home}</HomeLinkContainer>),
        elemBefore: (<HomeIcon />),
        href: '/home',
        analyticEvent: { key: 'appswitcher.home.link.click' },
      },
    ],
  };
}
