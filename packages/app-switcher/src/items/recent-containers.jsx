import React from 'react';
import { RecentContainerType, RecentContainerImage } from '../styled';

export default function (i18n, isAnonymousUser, recentContainers) {
  if (isAnonymousUser || !recentContainers.length) {
    return null;
  }

  return {
    heading: i18n.recent,
    items: recentContainers.map(container => ({
      content: (
        <div>
          <div>{container.name}</div>
          <RecentContainerType>{i18n[`container.${container.type}`]}</RecentContainerType>
        </div>
      ),
      elemBefore: (<RecentContainerImage src={container.iconUrl} alt={container.name} />),
      href: container.url,
      analyticEvent: { key: 'appswitcher.recent.container.click' },
    })),
  };
}
