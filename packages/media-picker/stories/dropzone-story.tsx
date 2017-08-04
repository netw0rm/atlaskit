import { storiesOf } from '@kadira/storybook';
import * as React from 'react';

import { Dropzone } from '../src';
import { Contents } from './dropzone-contents';

const apiUrl = 'https://media-api.atlassian.io';
const apiClientId = 'some-client-id';

const tenantClientProvider = (context: {collectionName: string}) => {
  return Promise.resolve({
    id: apiClientId,
    token: 'some-token'
  });
};

storiesOf('Dropzone', module)
  .add('default', () => {
    return (
      <Dropzone apiUrl={apiUrl} apiClientId={apiClientId} tenantClientProvider={tenantClientProvider}>
        <Contents />
      </Dropzone>
    );
  }
);
