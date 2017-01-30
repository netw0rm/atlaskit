import { ReactionPicker, Reactions } from '@atlaskit/reactions';
import * as React from 'react';

import { emojiService } from './emoji-service';
import { reactionsService } from './reactions-service';

const ari = 'ari:cloud:demo:123:123';

export default (
  <div>
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
