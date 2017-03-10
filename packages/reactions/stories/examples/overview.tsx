import { ReactionPicker, Reactions } from '../../src/';
import * as React from 'react';

import { getEmojiResource } from './emoji-provider';
import { reactionsProvider } from './reactions-provider';

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
