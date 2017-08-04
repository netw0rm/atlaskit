import { storiesOf } from '@kadira/storybook';
import * as React from 'react';

import { Popup } from '../src';

const apiUrl = 'https://media-api.atlassian.io';

const tenantClientProvider = (context: {collectionName: string}) => {
  return Promise.resolve({
    id: 'some-client-id',
    token: 'some-token'
  });
};

storiesOf('Popup', module)
  .add('default', () => {
    return (
      <Popup apiUrl={apiUrl} tenantClientProvider={tenantClientProvider} />
    );
  }
);
