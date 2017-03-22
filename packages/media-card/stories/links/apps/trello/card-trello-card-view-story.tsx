import * as React from 'react';
import { storiesOf } from '@kadira/storybook';
import { StoryList } from '@atlaskit/media-test-helpers';

import { LinkCardTrelloCardView } from '../../../../src';

const defaultThumbnailUrl = 'https://wac-cdn.atlassian.com/dam/jcr:51be4df5-1ffb-4a4d-9f44-0b84dad9de5e/hero-collaboration-partial.png';
const defaultIconUrl = 'https://wac-cdn.atlassian.com/assets/img/favicons/atlassian/apple-touch-icon-152x152.png';

storiesOf('LinkCardTrelloCardView', {})
  .add('Basic', () => (
    <StoryList>
      {[{
        title: 'Basic',
        content: <LinkCardTrelloCardView
          linkUrl="https://trello.com/b/hlo7gRqs/shpxxxviii-60"
          thumbnailUrl={defaultThumbnailUrl}
          iconUrl={defaultIconUrl}
          listName="Doing"
          card={{
            name: 'Design + Product (allthethings)',
            url: 'https://trello.com/c/sh1Qhm1D/11-design-product-allthethings'
          }}
          board={{
            name: 'SHPXXXVIII-60',
            url: 'https://trello.com/b/hlo7gRqs/shpxxxviii-60'
          }}
          members={[
            {
              avatarUrl: 'https://robohash.org/hectorzarco.png?set=set2&size=80x80',
              username: 'hector'
            },
            {
              avatarUrl: 'https://robohash.org/michaeljames.png?set=set1&size=80x80',
              username: 'michael'
            },
            {
              avatarUrl: 'https://robohash.org/jimmyluong.png?set=set3&size=80x80',
              username: 'jimmy'
            },
            {
              avatarUrl: 'https://robohash.org/vadimkazakov.png?set=set3&size=80x80',
              username: 'vadim'
            }
          ]}
        />
      }]}
    </StoryList>
  ));
