import { ReactionPicker, Reactions } from '../../src/';
import * as React from 'react';

import { reactionsProvider } from './reactions-provider';
import { emoji as emojiTestData } from '@atlaskit/util-data-test';

const { getEmojiResource } = emojiTestData.emojiStoryData;

const ari = 'ari:cloud:demo:123:123';

export default (
  <div style={{ position: 'relative' }}>
    <ReactionPicker
      emojiProvider={getEmojiResource()}
      onSelection={(emojiId) => reactionsProvider.toggleReaction(ari, emojiId)}
    />
    <Reactions
      ari={ari}
      emojiProvider={getEmojiResource()}
      reactionsProvider={reactionsProvider}
      onReactionClick={(emojiId) => reactionsProvider.toggleReaction(ari, emojiId)}
    />
  </div>
);
