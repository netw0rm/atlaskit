import { ReactionPicker, Reactions } from '../../src/';
import * as React from 'react';

import { emojiService } from './emoji-service';
import { reactionsService } from './reactions-service';

const ari = 'ari:cloud:demo:123:123';

export default (
  <div style={{ position: 'relative' }}>
    <ReactionPicker
      emojiService={emojiService}
      onSelection={(emojiId) => reactionsService.toggleReaction(ari, emojiId)}
    />
    <Reactions
      ari={ari}
      emojiService={emojiService}
      reactionsService={reactionsService}
      onReactionClick={(emojiId) => reactionsService.toggleReaction(ari, emojiId)}
    />
  </div>
);
