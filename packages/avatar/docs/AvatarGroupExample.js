import React from 'react';
import { AvatarGroup } from '@atlaskit/avatar';
import { Block } from './helpers';
import { RANDOM_USERS, getAdorableAvatar } from './data';

export default () => {
  const data = RANDOM_USERS.map(d => ({
    email: d.email,
    key: d.email,
    name: d.name,
    src: getAdorableAvatar(d.email),
  }));

  return (
    <div style={{ maxWidth: 270 }}>
      <Block heading="Stack">
        <AvatarGroup
          appearance="stack"
          onAvatarClick={console.log}
          data={data}
          size="large"
        />
      </Block>
      <Block heading="Grid">
        <AvatarGroup
          appearance="grid"
          onAvatarClick={console.log}
          data={data}
          maxCount={14}
          size="large"
        />
      </Block>
    </div>
  );
};
