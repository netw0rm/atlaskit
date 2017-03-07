import * as React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { MediaItem, ContextFactory, CardDelete, CardClick } from '@atlaskit/media-core';
import { LinkCard } from '../src';

import { StoryBookTokenProvider, StoryList  } from '@atlaskit/media-test-helpers';

const clientId = '5a9812fc-d029-4a39-8a46-d3cc36eed7ab';
const serviceHost = 'https://dt-api-filestore.internal.app.dev.atlassian.io';
const tokenProvider = StoryBookTokenProvider.tokenProvider;
const context = ContextFactory.create({ clientId, serviceHost, tokenProvider });

const deleteAction = CardDelete((item: MediaItem, e?: Event) => {
  action('delete')(JSON.stringify(item), e);
});

const clickAction = CardClick((item: MediaItem, e?: Event) => {
  action('click')(JSON.stringify(item), e);
});

const annotateAction = {
  label: 'Annotate',
  handler: (item: MediaItem, e?: Event) => {
    action('annotate')(JSON.stringify(item));
  }
};

storiesOf('LinkCard', {})
  .add('Card', () => {
    const linkCardViewHorizontals = [
      {
        title: 'Only required props',
        content: (
          <LinkCard
            context={context}
            linkUrl="https://atlassian.com"
          />
        )
      }
    ];

    return <StoryList>{linkCardViewHorizontals}</StoryList>;
  });
