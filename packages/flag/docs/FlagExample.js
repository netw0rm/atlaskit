import React from 'react';
import Flag from '@atlaskit/flag';
import { getIcon } from './utils';

const actions = [
  { content: 'Understood', onClick: () => console.log('Understood') },
  { content: 'No Way!', onClick: () => console.log('No Way!') },
];

const FlagExample = () => (
  <Flag
    icon={getIcon('success')}
    actions={actions}
    id="flag-1"
    key="flag-1"
    title="The Internet seems to be full"
    description="Somebody forgot to upgrade the storage."
  />
);

export default FlagExample;
