import * as React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { MediaItem, ContextFactory, CardDelete, CardClick } from '@atlaskit/media-core';
import { LinkCard } from '../src';

import { StoryBookTokenProvider } from './tokenProvider';
import StoryList from './story-list';

const collectionName = 'MediaServicesSample';
const wrongFileId = 'wrong-file-id';
const thumbnailNotAvailableId = '64204867-bfa6-4e16-a163-a6477d0f0112';
const successfulFileId = '2dfcc12d-04d7-46e7-9fdf-3715ff00ba40';
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

const styles = {
  statesWrapper: {
    listStyle: 'none',
    display: 'inline-block'
  },
  stateTitle: {
    textAlign: 'center',
    padding: '5px'
  }
};

storiesOf('LinkCard', {})
  .add('single card', () => {
    const linkCardViewHorizontals = [
      {
        title: 'Only required props',
        content: (
          <LinkCard
            context={context}
            linkUrl="https://atlassian.com"
            title="Welcome to the world of trips."
          />
        )
      }
    ];

    return <StoryList>{linkCardViewHorizontals}</StoryList>;
  });
