import { storiesOf, action } from '@kadira/storybook';
import * as React from 'react';

import { name } from '../package.json';
import MentionItem from '../src/components/MentionItem';
import { sampleAvatarUrl as avatarUrl } from './story-data';

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
      avatarUrl,
      id: '666',
      name: 'Craig Petchell',
      mentionName: 'petch',
    };

    return renderSingleMention(
      <MentionItem mention={mention} onSelection={action('onSelection')} />
    );
  })
  .add('simple mention no avatar', () => {
    const mention = {
      id: '666',
      name: 'Craig Petchell',
      mentionName: 'petch',
    };

    return renderSingleMention(
      <MentionItem mention={mention} onSelection={action('onSelection')} />
    );
  })
  .add('simple mention unassigned user', () => {
    const mention = {
      id: 'unassigned',
      name: 'Unassigned',
    };

    return renderSingleMention(
      <MentionItem mention={mention} onSelection={action('onSelection')} />
    );
  })
  .add('simple mention with nickname', () => {
    const mention = {
      avatarUrl,
      id: '666',
      name: 'Craig Petchell',
      mentionName: 'cpetchell',
      nickname: 'petch'
    };

    return renderSingleMention(
      <MentionItem mention={mention} onSelection={action('onSelection')} />
    );
  })
  .add('simple mention selected', () => {
    const mention = {
      avatarUrl,
      id: '666',
      name: 'Craig Petchell',
      mentionName: 'petch',
      selected: true,
    };

    return renderSingleMention(
      <MentionItem mention={mention} onSelection={action('onSelection')} />
    );
  })
  .add('mention with the lot', () => {
    const mention = {
      avatarUrl,
      id: '666',
      name: 'Craig Petchell',
      mentionName: 'cpetchell',
      nickname: 'petch',
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
        mentionName: [],
        nickname: [
          {
            start: 0,
            end: 4,
          },
        ],
      },
    };

    return renderSingleMention(
      <MentionItem mention={mention} onSelection={action('onSelection')} />
    );
  })
  .add('mention with lozenge', () => {
    const mention = {
      id: '666',
      name: 'Oscar Wallhult',
      mentionName: 'oscar',
      selected: false,
      lozenge: 'teammate',
    };

    return renderSingleMention(
      <MentionItem mention={mention} onSelection={action('onSelection')} />
    );
  })
  .add('mention with lozenge and presence', () => {
    const mention = {
      id: '666',
      name: 'Oscar Wallhult',
      mentionName: 'oscar',
      selected: false,
      lozenge: 'teammate',
      status: 'online',
      time: '11:23am',
    };

    return renderSingleMention(
      <MentionItem mention={mention} onSelection={action('onSelection')} />
    );
  })
;
