import { storiesOf, action } from '@kadira/storybook';
import React from 'react';

import { name } from '../package.json';
import MentionItem from '../src/components/ak-mention-item';

function renderSingleMention(mention) {
  return (
    <div className="ak-mention-list">
      <ul>
        {mention}
      </ul>
    </div>
  );
}

storiesOf(`${name}/MentionItem`, module)
  .add('simple mention', () => {
    const mention = {
      avatarUrl: 'https://secure.gravatar.com/avatar/0eda4b603469d402e11e89a1dff51834?s=64',
      id: '666',
      name: 'Craig Petchell',
      mentionName: 'petch',
    };

    return renderSingleMention(
      <MentionItem {...mention} onHover={action('onHover')} onSelection={action('onSelection')} />
    );
  })
  .add('simple mention no avatar', () => {
    const mention = {
      id: '666',
      name: 'Craig Petchell',
      mentionName: 'petch',
    };

    return renderSingleMention(
      <MentionItem {...mention} onHover={action('onHover')} onSelection={action('onSelection')} />
    );
  })
  .add('simple mention selected', () => {
    const mention = {
      avatarUrl: 'https://secure.gravatar.com/avatar/0eda4b603469d402e11e89a1dff51834?s=64',
      id: '666',
      name: 'Craig Petchell',
      mentionName: 'petch',
      selected: true,
    };

    return renderSingleMention(
      <MentionItem {...mention} onHover={action('onHover')} onSelection={action('onSelection')} />
    );
  })
  .add('mention with the lot', () => {
    const mention = {
      avatarUrl: 'https://secure.gravatar.com/avatar/0eda4b603469d402e11e89a1dff51834?s=64',
      id: '666',
      name: 'Craig Petchell',
      mentionName: 'petch',
      selected: true,
      status: 'online',
      time: '11:23am',
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
      <MentionItem {...mention} onHover={action('onHover')} onSelection={action('onSelection')} />
    );
  });
