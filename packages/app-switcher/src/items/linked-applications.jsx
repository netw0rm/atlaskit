// @flow
import React from 'react';
import Lozenge from '@atlaskit/lozenge';
import { Item, Link, LozengeContainer } from '../styled';
import type { Translations, LinkedApplications, DropdownConfig } from '../internal/types';

export default function (
  i18n: Translations,
  isAnonymousUser: boolean,
  canAddProducts: boolean,
  isSiteAdminLinkEnabled?: boolean,
  linkedApplications: LinkedApplications,
): DropdownConfig {
  if (linkedApplications.error) {
    return {
      heading: i18n.apps,
      items: [{
        content: (<Item>{i18n['applinks.error']}</Item>),
      }],
    };
  }

  const items = linkedApplications.apps.map(({ name, url, product, label }) => ({
    content: (
      <Item>
        {name}
        {label && <LozengeContainer>
          <Lozenge appearance="inprogress" isBold>{label}</Lozenge>
        </LozengeContainer>}
      </Item>
    ),
    href: url,
    analyticEvent: { key: 'appswitcher.app.link.click', properties: { product } },
  }));

  if (!isAnonymousUser && linkedApplications.suggested) {
    linkedApplications.suggested.forEach(({ name, product, onClick }) => {
      items.push({
        content: (
          <Item className="app-switcher-suggested-application">
            {name}
            <LozengeContainer>
              <Lozenge appearance="inprogress">{i18n['try.lozenge'] || 'try'}</Lozenge>
            </LozengeContainer>
          </Item>
        ),
        analyticEvent: { key: 'appswitcher.discovery.user.try.clicked', properties: { product } },
        onClick,
      });
    });
  }

  if (!isAnonymousUser && (canAddProducts || isSiteAdminLinkEnabled)) {
    items.push({
      content: <Item>{i18n['discover.applications'] || 'Discover applications'}</Item>,
      href: isSiteAdminLinkEnabled
        ? '/admin/billing/addapplication'
        : '/trusted-admin/billing/addapplication',
      analyticEvent: {
        key: 'appswitcher.discover.applications.link.click',
        properties: {
          isSiteAdmin: isSiteAdminLinkEnabled,
        },
      },
    });
  }
  if (linkedApplications.configureLink && !isAnonymousUser) {
    items.push({
      content: (<Item><Link>{i18n.configure}</Link></Item>),
      href: linkedApplications.configureLink,
      analyticEvent: { key: 'appswitcher.configure.link.click' },
    });
  }

  return {
    heading: i18n.apps,
    items,
  };
}
