import React from 'react';
import { ItemWithIcon, RecentContainerType, RecentContainerImage, RecentContainerName } from '../styled';

export default function (i18n, isAnonymousUser, recentContainers) {
  if (isAnonymousUser || !recentContainers.length) {
    return null;
  }

  const limitedRecentContainers = recentContainers.slice(0, 6);

  return {
    heading: i18n.recent,
    items: limitedRecentContainers.map(container => ({
      content: (
        <ItemWithIcon>
          <RecentContainerName>{container.name}</RecentContainerName>
          <RecentContainerType>{i18n[`container.${container.type}`]}</RecentContainerType>
        </ItemWithIcon>
      ),
      elemBefore: (<RecentContainerImage src={container.iconUrl} alt={container.name} />),
      href: container.url,
      analyticEvent: { key: 'appswitcher.recent.container.click' },
    })),
  };
}
