import { storiesOf } from '@kadira/storybook';
import * as React from 'react';
import MediaViewerAdapter from '../src';
import { name } from '../package.json';
import { ContextFactory } from '@atlaskit/media-core';
import { StoryBookTokenProvider } from '@atlaskit/media-test-helpers';

const collectionName = 'MediaServicesSample';
const clientId = '5a9812fc-d029-4a39-8a46-d3cc36eed7ab';
const serviceHost = 'https://dt-api-filestore.internal.app.dev.atlassian.io';
const access = {
  'urn:filestore:file:*': ['read'],
  'urn:filestore:collection:MediaServicesSample': ['read']
};
const tokenProvider = StoryBookTokenProvider.withAccess(access);
const context = ContextFactory.create({ clientId, serviceHost, tokenProvider });

storiesOf(name, module)
  .add('with collection', () => (
    <MediaViewerAdapter
      context={context}
      occurenceKey={'603c663c-d503-4302-a663-4bb1308cc7a7'}
      collectionName={collectionName}
    />
  ));
