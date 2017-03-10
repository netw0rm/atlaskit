import * as React from 'react';
import { storiesOf } from '@kadira/storybook';
import { ContextFactory } from '@atlaskit/media-core';
import { LinkCard } from '../src';

import { StoryBookTokenProvider, StoryList } from '@atlaskit/media-test-helpers';

const clientId = '5a9812fc-d029-4a39-8a46-d3cc36eed7ab';
const serviceHost = 'https://dt-api-filestore.internal.app.dev.atlassian.io';
const tokenProvider = StoryBookTokenProvider.tokenProvider;
const context = ContextFactory.create({ clientId, serviceHost, tokenProvider });

storiesOf('LinkCard', {})
  .add('From url string', () => {
    const linkCardViewHorizontals = [
      {
        title: 'Only required props',
        content: (
          <LinkCard
            context={context}
            link="https://atlassian.com"
          />
        )
      }
    ];

    return <StoryList>{linkCardViewHorizontals}</StoryList>;
  })
  .add('From link and collection id', () => {
    const linkFromId = { id: 'e2365f30-1e08-4259-9372-56247303d1ec', collection: 'MediaServicesSample' };

    const linkCardViewHorizontals = [
      {
        title: 'Only required props',
        content: (
          <LinkCard
            context={context}
            link={linkFromId}
          />
        )
      }
    ];

    return <StoryList>{linkCardViewHorizontals}</StoryList>;
  })
  .add('From playable url string', () => {
    return <StoryList>{[
      {
        title: 'Youtube',
        content: (
          <LinkCard
            context={context}
            link="https://www.youtube.com/watch?v=zso6jskUaS8"
          />
        )
      },
      {
        title: 'Spotify',
        content: (
          <LinkCard
            context={context}
            link="https://play.spotify.com/track/2Foc5Q5nqNiosCNqttzHof"
          />
        )
      },
      {
        title: 'Soundcloud',
        content: (
          <LinkCard
            context={context}
            link="https://soundcloud.com/kodak-black/tunnel-vision-1"
          />
        )
      }
    ]}</StoryList>;
  })
  .add('From trello board url', () => {
    return <StoryList>{[
      {
        title: 'Public Board',
        content: (
          <LinkCard
            context={context}
            link="https://trello.com/b/rq2mYJNn/public-trello-boards"
          />
        )
      },
      {
        title: 'Private Board',
        content: (
          <LinkCard
            context={context}
            link="https://trello.com/b/hlo7gRqs/shpxxxviii-60"
          />
        )
      }
    ]}</StoryList>;
  });
