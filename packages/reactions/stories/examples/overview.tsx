import { ReactionPicker, Reactions } from '../../src/';
import * as React from 'react';

import { emojiService } from './emoji-service';
import { reactionsProvider } from './reactions-provider';

const ari = 'ari:cloud:demo:123:123';

export default (
  <div style={{ position: 'relative' }}>
    <ReactionPicker
      emojiService={emojiService}
      onSelection={(emojiId) => reactionsProvider.toggleReaction(ari, emojiId)}
    />
    <Reactions
      ari={ari}
      emojiService={emojiService}
      reactionsProvider={reactionsProvider}
      onReactionClick={(emojiId) => reactionsProvider.toggleReaction(ari, emojiId)}
    />
  </div>
);
