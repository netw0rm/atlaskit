import React from 'react';
import AkBadge from '@atlaskit/badge';

const randomBadge = (theme = 'default') => {
  const badgeNumber = Math.random() > 0.3 ? (Math.round(Math.random() * 200)) : 0;
  return badgeNumber ? (
    <AkBadge
      appearance={Math.random() > 0.5 ? 'primary' : null}
      theme={theme}
      value={badgeNumber}
    />
  ) : null;
};

export default randomBadge;
