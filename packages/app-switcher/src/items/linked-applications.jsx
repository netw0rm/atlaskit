import React from 'react';
import { Link } from '../styled';

export default function (i18n, isAnonymousUser, linkedApplications) {
  if (linkedApplications.error) {
    return {
      heading: i18n.apps,
      items: [{
        content: (<div>{i18n['applinks.error']}</div>),
      }],
    };
  }

  const items = linkedApplications.apps.map(application => ({
    content: (<div>{application.name}</div>),
    href: application.url,
    analyticEvent: { key: 'appswitcher.app.link.click', properties: { product: application.product } },
  }));

  if (linkedApplications.configureLink && !isAnonymousUser) {
    items.push({
      content: (<Link>Configure</Link>),
      href: linkedApplications.configureLink,
      analyticEvent: { key: 'appswitcher.configure.link.click' },
    });
  }

  return {
    heading: i18n.apps,
    items,
  };
}
