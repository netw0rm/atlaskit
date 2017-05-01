import { StoryBookTokenProvider } from './tokenProvider';
import { defaultCollectionName } from './collectionNames';
import { ContextFactory, Context } from '@atlaskit/media-core';

export const defaultClientId = '5a9812fc-d029-4a39-8a46-d3cc36eed7ab';
export const defaultServiceHost = 'https://dt-api-filestore.internal.app.dev.atlassian.io';

export const createStorybookContext = (clientId = defaultClientId, serviceHost = defaultServiceHost): Context => {
  const tokenProvider = StoryBookTokenProvider.withAccess({
     [`urn:filestore:collection:${defaultCollectionName}`]: [
        'read',
        'update'
      ],
      'urn:filestore:file:*': [
        'read'
      ],
      'urn:filestore:chunk:*': [
        'read'
      ]
  });
  const context = ContextFactory.create({ clientId, serviceHost, tokenProvider });

  return context;
};
