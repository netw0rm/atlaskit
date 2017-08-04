import { storiesOf } from '@kadira/storybook';
import * as React from 'react';

import { Dropzone } from '../../src';
import { Contents } from './dropzone-contents';

const apiUrl = 'https://media-api.atlassian.io';

const tenantClientProvider = (context: {collectionName: string}) => {
  return Promise.resolve({
    id: 'some-client-id',
    token: 'some-token'
  });
};

storiesOf('Dropzone', module)
  .add('default', () => {
    return (
      <Dropzone apiUrl={apiUrl} tenantClientProvider={tenantClientProvider}>
        <Contents />
      </Dropzone>
    );
  }
);
