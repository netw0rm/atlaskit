import * as React from 'react';
import {Component} from 'react';
import {storiesOf, action} from '@kadira/storybook';
import {LinkCardViewHorizontal} from '../src';
import {tallImage, wideImage, wideTransparentImage, smallImage} from './images';
import {StoryList} from '@atlaskit/media-test-helpers';

const onClick = (event: Event) => {
  action('click')();
};

const menuActions = [
  {label: 'Open', handler: () => { action('open')(); }},
  {label: 'Close', handler: () => { action('close')(); }}
];

const defaultThumbnailUrl = 'https://wac-cdn.atlassian.com/dam/jcr:51be4df5-1ffb-4a4d-9f44-0b84dad9de5e/hero-collaboration-partial.png';
const defaultIconUrl = 'https://wac-cdn.atlassian.com/assets/img/favicons/atlassian/apple-touch-icon-152x152.png';

storiesOf('LinkCardViewHorizontal', {})
  .add('Missing metadata', () => {
    const linkCardViewHorizontals = [
      {
        title: 'Only required props',
        content: (
          <LinkCardViewHorizontal
            title="Welcome to the world of trips."
            linkUrl="the-url.user.linked"
          />
        )
      },
      {
        title: 'No description',
        content: (
          <LinkCardViewHorizontal
            linkUrl="the-url.user.linked"
            title="Welcome to the world of trips."
            thumbnailUrl={defaultThumbnailUrl}
            iconUrl={defaultIconUrl}
          />
        )
      },
      {
        title: 'No thumbnailUrl',
        content: (
          <LinkCardViewHorizontal
            linkUrl="the-url.user.linked"
            title="Welcome to the world of trips."
            description="Convert today’s signups into tomorrow some text after"
            iconUrl={defaultIconUrl}
          />
        )
      },
      {
        title: 'No iconUrl',
        content: (
          <LinkCardViewHorizontal
            linkUrl="the-url.user.linked"
            title="Welcome to the world of trips."
            description="Convert today’s signups into tomorrow some text after"
            thumbnailUrl={defaultThumbnailUrl}
          />
        )
      },
      {
        title: 'Failing thumbnailUrl',
        content: (
          <LinkCardViewHorizontal
            linkUrl="the-url.user.linked"
            title="Welcome to the world of trips."
            description="Convert today’s signups into tomorrow some text after"
            thumbnailUrl="http://www.fakeresponse.com/api/?sleep=1&meta=false&status=404"
            iconUrl={defaultIconUrl}
          />
        )
      },
      {
        title: 'Failing iconUrl',
        content: (
          <LinkCardViewHorizontal
            linkUrl="the-url.user.linked"
            title="Welcome to the world of trips."
            description="Convert today’s signups into tomorrow some text after"
            thumbnailUrl={defaultThumbnailUrl}
            iconUrl="http://www.fakeresponse.com/api/?sleep=1&meta=false&status=404"
          />
        )
      },
    ];

    return <StoryList>{linkCardViewHorizontals}</StoryList>;
  })
  .add('Various text lengths', () => {
    const linkCardViewHorizontals = [
      {
        title: 'Long description',
        content: (
          <LinkCardViewHorizontal
            title="This week inside Intercom."
            description="You need to continuously onboard existing customers. Convert today’s signups into tomorrow some text after"
            linkUrl="the-url.user.linked"
            thumbnailUrl={defaultThumbnailUrl}
            iconUrl={defaultIconUrl}
          />
        )
      },
      {
        title: 'Long title and description',
        content: (
          <LinkCardViewHorizontal
            title="Successful customer onboarding never stops - Inside Intercom."
            description="You need to continuously onboard existing customers. Convert today’s signups into tomorrow some text after"
            linkUrl="the-url.user.linked"
            thumbnailUrl={defaultThumbnailUrl}
            iconUrl={defaultIconUrl}
          />
        )
      },
      {
        title: 'Long link',
        content: (
          <LinkCardViewHorizontal
            title="This week inside Intercom."
            description="Convert today’s signups into tomorrow some text after"
            linkUrl="http://localhost:9001/?selectedKind=LinkCardViewHorizontal&selectedStory=Various%20text%20lengths&full=0&down=1&left=1&panelRight=0&downPanel=kadirahq%2Fstorybook-addon-actions%2Factions-panel"
            thumbnailUrl={defaultThumbnailUrl}
            iconUrl={defaultIconUrl}
          />
        )
      },
    ];

    return <StoryList>{linkCardViewHorizontals}</StoryList>;
  })
  .add('Menu and click actions', () => (
    <StoryList>
       {[{
         title: 'card click',
         content: <LinkCardViewHorizontal
          title="This week inside Intercom."
          description="Convert today’s signups into tomorrow some text after"
          linkUrl="http://localhost:9001/?selectedKind=LinkCardViewHorizontal&selectedStory=Various%20text%20lengths&full=0&down=1&left=1&panelRight=0&downPanel=kadirahq%2Fstorybook-addon-actions%2Factions-panel"
          thumbnailUrl={defaultThumbnailUrl}
          iconUrl={defaultIconUrl}
          onClick={onClick}
         />
       },
       {
         title: 'card menu',
         content: <LinkCardViewHorizontal
          title="This week inside Intercom."
          description="Convert today’s signups into tomorrow some text after"
          linkUrl="http://localhost:9001/?selectedKind=LinkCardViewHorizontal&selectedStory=Various%20text%20lengths&full=0&down=1&left=1&panelRight=0&downPanel=kadirahq%2Fstorybook-addon-actions%2Factions-panel"
          thumbnailUrl={defaultThumbnailUrl}
          iconUrl={defaultIconUrl}
          menuActions={menuActions}
         />
       }]}
    </StoryList>
  ))
  .add('Square', () => (
    <LinkCardViewHorizontal
      display="square"
      title="This week inside Intercom."
      description="Convert today’s signups into tomorrow some text after"
      linkUrl="http://localhost:9001/?selectedKind=LinkCardViewHorizontal&selectedStory=Various%20text%20lengths&full=0&down=1&left=1&panelRight=0&downPanel=kadirahq%2Fstorybook-addon-actions%2Factions-panel"
      thumbnailUrl="https://wac-cdn.atlassian.com/dam/jcr:89e146b4-642e-41fc-8e65-7848337d7bdd/atlassian_charlie_square.png"
      iconUrl="https://wac-cdn.atlassian.com/assets/img/favicons/atlassian/apple-touch-icon-152x152.png"
      menuActions={menuActions}
    />
  ));
