import * as React from 'react';
import {storiesOf} from '@kadira/storybook';
import {StoryList} from '@atlaskit/media-test-helpers';

import {LinkCardViewSmall} from '../../src/links/cardViewSmall';

const defaultThumbnailUrl = 'https://wac-cdn.atlassian.com/dam/jcr:51be4df5-1ffb-4a4d-9f44-0b84dad9de5e/hero-collaboration-partial.png';

storiesOf('LinkCardViewSmall', {})
  .add('Default', () => (
    <StoryList>
      {[{
        title: 'Only Required Props',
        content: <LinkCardViewSmall
                  linkUrl="the-url.user.linked"
                  title="Welcome to the world of trips."
        />
      }, {
        title: 'Thumbnail',
        content: <LinkCardViewSmall
                  linkUrl="the-url.user.linked"
                  title="Welcome to the world of trips."
                  thumbnailUrl={defaultThumbnailUrl}
        />
      }, {
        title: 'Site name',
        content: <LinkCardViewSmall
                  linkUrl="the-url.user.linked"
                  title="Welcome to the world of trips."
                  site="This is awesome site's name"
                  thumbnailUrl={defaultThumbnailUrl}
        />
      }]}
    </StoryList>
  ));

