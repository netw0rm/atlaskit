import MentionResource from '../test/_mock-ak-mention-resource';
import { MediaProvider, MediaViewContextScope, MediaContextConfig } from '@atlaskit/editor-core';
import { StoryBookTokenProvider } from '@atlaskit/media-test-helpers';

export const resourceProvider = new MentionResource({
  minWait: 10,
  maxWait: 25,
});

export const mediaProvider = Promise.resolve({
  getViewContext(scope?: MediaViewContextScope): Promise<MediaContextConfig> {
    return Promise.resolve({
      clientId: '5a9812fc-d029-4a39-8a46-d3cc36eed7ab',
      serviceHost: 'https://dt-api-filestore.internal.app.dev.atlassian.io',
      tokenProvider: StoryBookTokenProvider.tokenProvider
    });
  }
} as MediaProvider);
