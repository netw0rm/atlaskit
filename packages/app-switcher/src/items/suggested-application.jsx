// @flow
import React from 'react';
import { ConfluenceLogo, JiraLogo } from '@atlaskit/logo';
import { LogoContainer, SuggestedApplicationTagline, Link, Item } from '../styled';
import type { Translations, SuggestedApplication, DropdownConfig } from '../internal/types';

const logos = {
  jira: <JiraLogo />,
  confluence: <ConfluenceLogo />,
};

export default function (
  i18n: Translations,
  isAnonymousUser: boolean,
  suggestedApplication: SuggestedApplication,
  hiddenByUser: boolean
): DropdownConfig | null {
  const { application, show, url } = suggestedApplication;

  if (isAnonymousUser || !show || hiddenByUser) {
    return null;
  }

  const logo = application ? logos[application] : '';

  return {
    heading: i18n['try.other.apps'],
    items: [
      {
        content: (
          <Item>
            <LogoContainer>{logo}</LogoContainer>
            <SuggestedApplicationTagline>{i18n[`suggested.application.description.${String(application)}`]}</SuggestedApplicationTagline>
          </Item>
        ),
        href: url,
        analyticEvent: { key: `appswitcher.discovery.user.select.${String(application)}` },
      },
      {
        content: (
          <Link>{i18n["don't.show.this.again"]}</Link>
        ),
        analyticEvent: { key: 'appswitcher.discovery.nothanks.button.click' },
        action: 'suggestedApplicationDontShowAgainClick',
      },
    ],
  };
}
