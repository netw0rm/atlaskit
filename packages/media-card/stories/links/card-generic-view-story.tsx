import * as React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import {StoryList} from '@atlaskit/media-test-helpers';
import {CardActionType} from '@atlaskit/media-core';

import {LinkCardGenericView} from '../../src';

const onClick = (event: Event) => {
  action('click')();
};

const deleteAction = {type: CardActionType.delete, label: 'Delete', handler: () => { action('delete')(); }};

const actions = [
  {label: 'Open', handler: () => { action('open')(); }},
  {label: 'Close', handler: () => { action('close')(); }},
  deleteAction
];

const defaultThumbnailUrl = 'https://wac-cdn.atlassian.com/dam/jcr:51be4df5-1ffb-4a4d-9f44-0b84dad9de5e/hero-collaboration-partial.png';
const defaultIconUrl = 'https://wac-cdn.atlassian.com/assets/img/favicons/atlassian/apple-touch-icon-152x152.png';

storiesOf('LinkCardGenericView', {})
  .add('Missing metadata', () => {
    const linkCardGenericViews = [
      {
        title: 'Only required props',
        content: (
          <LinkCardGenericView
            title="Welcome to the world of trips."
            linkUrl="the-url.user.linked"
          />
        )
      },
      {
        title: 'No description',
        content: (
          <LinkCardGenericView
            linkUrl="the-url.user.linked"
            title="Welcome to the world of trips."
            site="Touch Sensitive Site"
            thumbnailUrl={defaultThumbnailUrl}
            iconUrl={defaultIconUrl}
          />
        )
      },
      {
        title: 'No thumbnailUrl',
        content: (
          <LinkCardGenericView
            linkUrl="the-url.user.linked"
            title="Welcome to the world of trips."
            site="Touch Sensitive Site"
            description="Convert today’s signups into tomorrow some text after"
            iconUrl={defaultIconUrl}
          />
        )
      },
      {
        title: 'No iconUrl',
        content: (
          <LinkCardGenericView
            linkUrl="the-url.user.linked"
            title="Welcome to the world of trips."
            site="Touch Sensitive Site"
            description="Convert today’s signups into tomorrow some text after"
            thumbnailUrl={defaultThumbnailUrl}
          />
        )
      },
      {
        title: 'No site',
        content: (
          <LinkCardGenericView
            linkUrl="the-url.user.linked"
            title="Welcome to the world of trips."
            description="Convert today’s signups into tomorrow some text after"
            thumbnailUrl={defaultThumbnailUrl}
            iconUrl={defaultIconUrl}
          />
        )
      },
      {
        title: 'Failing thumbnailUrl',
        content: (
          <LinkCardGenericView
            linkUrl="the-url.user.linked"
            title="Welcome to the world of trips."
            site="Touch Sensitive Site"
            description="Convert today’s signups into tomorrow some text after"
            thumbnailUrl="http://www.fakeresponse.com/api/?sleep=1&meta=false&status=404"
            iconUrl={defaultIconUrl}
          />
        )
      },
      {
        title: 'Failing iconUrl',
        content: (
          <LinkCardGenericView
            linkUrl="the-url.user.linked"
            title="Welcome to the world of trips."
            site="Touch Sensitive Site"
            description="Convert today’s signups into tomorrow some text after"
            thumbnailUrl={defaultThumbnailUrl}
            iconUrl="http://www.fakeresponse.com/api/?sleep=1&meta=false&status=404"
          />
        )
      },
    ];

    return <StoryList>{linkCardGenericViews}</StoryList>;
  })
  .add('Various text lengths', () => {
    const linkCardViewHorizontals = [
      {
        title: 'Long description',
        content: (
          <LinkCardGenericView
            title="This week inside Intercom."
            site="The site name"
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
          <LinkCardGenericView
            title="Successful customer onboarding never stops - Inside Intercom."
            site="The site name"
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
          <LinkCardGenericView
            title="This week inside Intercom."
            description="Convert today’s signups into tomorrow some text after"
            linkUrl="http://localhost:9001/?selectedKind=LinkCardViewHorizontal&selectedStory=Various%20text%20lengths&full=0&down=1&left=1&panelRight=0&downPanel=kadirahq%2Fstorybook-addon-actions%2Factions-panel"
            thumbnailUrl={defaultThumbnailUrl}
            iconUrl={defaultIconUrl}
          />
        )
      },
      {
        title: 'Long site',
        content: (
          <LinkCardGenericView
            title="This week inside Intercom."
            site="The site name is really really long and stuff with some more stuff"
            description="Convert today’s signups into tomorrow some text after"
            linkUrl="http://localhost:9001/?selectedKind=LinkCardViewHorizontal&selectedStory=Various%20text%20lengths&full=0&down=1&left=1&panelRight=0&downPanel=kadirahq%2Fstorybook-addon-actions%2Factions-panel"
            thumbnailUrl={defaultThumbnailUrl}
            iconUrl={defaultIconUrl}
          />
        )
      }
    ];

    return <StoryList>{linkCardViewHorizontals}</StoryList>;
  })
  .add('Menu and click actions', () => (
    <StoryList>
       {[{
         title: 'card click',
         content: <LinkCardGenericView
          title="This week inside Intercom."
          site="The site name"
          description="Convert today’s signups into tomorrow some text after"
          linkUrl="http://localhost:9001/?selectedKind=LinkCardViewHorizontal&selectedStory=Various%20text%20lengths&full=0&down=1&left=1&panelRight=0&downPanel=kadirahq%2Fstorybook-addon-actions%2Factions-panel"
          thumbnailUrl={defaultThumbnailUrl}
          iconUrl={defaultIconUrl}
          onClick={onClick}
         />
       },
       {
         title: 'card menu',
         content: <LinkCardGenericView
          title="This week inside Intercom."
          site="The site name"
          description="Convert today’s signups into tomorrow some text after"
          linkUrl="http://localhost:9001/?selectedKind=LinkCardViewHorizontal&selectedStory=Various%20text%20lengths&full=0&down=1&left=1&panelRight=0&downPanel=kadirahq%2Fstorybook-addon-actions%2Factions-panel"
          thumbnailUrl={defaultThumbnailUrl}
          iconUrl={defaultIconUrl}
          actions={actions}
         />
       },
       {
         title: 'card delete',
         content: (
           <LinkCardGenericView
              title="This week inside Intercom."
              site="The site name"
              description="Convert today’s signups into tomorrow some text after"
              linkUrl="http://localhost:9001/?selectedKind=LinkCardViewHorizontal&selectedStory=Various%20text%20lengths&full=0&down=1&left=1&panelRight=0&downPanel=kadirahq%2Fstorybook-addon-actions%2Factions-panel"
              thumbnailUrl={defaultThumbnailUrl}
              iconUrl={defaultIconUrl}
              actions={[deleteAction]}
           />
         )
       }]}
    </StoryList>
  ))
  .add('Square', () => {
    const linkCardViewHorizontals = [
      {
        title: 'Default Square card',
        content: (
          <LinkCardGenericView
            appearance="square"
            title="This week inside Intercom."
            site="The site name"
            description="Convert today’s signups into tomorrow some text after"
            linkUrl="http://localhost:9001/?selectedKind=LinkCardViewHorizontal&selectedStory=Various%20text%20lengths&full=0&down=1&left=1&panelRight=0&downPanel=kadirahq%2Fstorybook-addon-actions%2Factions-panel"
            thumbnailUrl="https://wac-cdn.atlassian.com/dam/jcr:89e146b4-642e-41fc-8e65-7848337d7bdd/atlassian_charlie_square.png"
            iconUrl="https://wac-cdn.atlassian.com/assets/img/favicons/atlassian/apple-touch-icon-152x152.png"
            actions={actions}
          />
        )
      }
    ];

    return <StoryList>{linkCardViewHorizontals}</StoryList>;
  });
