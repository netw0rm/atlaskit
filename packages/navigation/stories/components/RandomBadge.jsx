import React from 'react';
import AkBadge from '@atlaskit/badge';

// NOTE: P
const randomBadge = (theme = 'default') => {
  console.log('theme', theme);
  const badgeNumber = Math.random() > 0.3 ? (Math.round(Math.random() * 200)) : 0;
  return badgeNumber ? (
    <AkBadge
      appearance="primary"
      theme={theme}
      value={badgeNumber}
    />
  ) : null;
};

export default randomBadge;
