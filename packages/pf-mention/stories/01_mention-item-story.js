import { storiesOf, action } from '@kadira/storybook';
import reactify from 'akutil-react';
import React from 'react';

import pfMentionItem from '../src/wc/pf-mention-item';

const MentionItem = reactify(pfMentionItem);

function renderSingleMention(mention) {
  return (
    <div className="pf-mention-list">
      <ul>
        {mention}
      </ul>
    </div>
  );
}

storiesOf('Mention Item', module)
  .add('simple mention', () => {
    const mention = {
      avatarUrl: 'https://secure.gravatar.com/avatar/0eda4b603469d402e11e89a1dff51834?s=64',
      idx: 666,
      name: 'Craig Petchell',
      mentionName: 'petch',
    };

    return renderSingleMention(
      <MentionItem {...mention} onHover={action('onHover')} onSelection={action('onSelection')} />
    );
  })
  .add('simple mention no avatar', () => {
    const mention = {
      id: 666,
      name: 'Craig Petchell',
      mentionName: 'petch',
    };

    return renderSingleMention(
      <MentionItem {...mention} />
    );
  })
  .add('simple mention selected', () => {
    const mention = {
      avatarUrl: 'https://secure.gravatar.com/avatar/0eda4b603469d402e11e89a1dff51834?s=64',
      id: 666,
      name: 'Craig Petchell',
      mentionName: 'petch',
      selected: true,
    };

    return renderSingleMention(
      <MentionItem {...mention} />
    );
  })
  .add('mention with the lot', () => {
    const mention = {
      avatarUrl: 'https://secure.gravatar.com/avatar/0eda4b603469d402e11e89a1dff51834?s=64',
      id: 666,
      name: 'Craig Petchell',
      mentionName: 'petch',
      selected: true,
      presence: {
        status: 'online',
        time: '11:23am',
      },
      highlight: {
        name: [
          {
            start: 6,
            end: 10,
          },
        ],
        mentionName: [
          {
            start: 0,
            end: 4,
          },
        ],
      },
    };

    return renderSingleMention(
      <MentionItem {...mention} />
    );
  });
