import { ReactionPicker, Reactions } from '../../src/';
import * as React from 'react';

import { reactionsProvider } from './reactions-provider';
import { emoji as emojiTestData } from '@atlaskit/util-data-test';

const { getEmojiResource } = emojiTestData.emojiStoryData;

const demoAri = 'ari:cloud:owner:demo-cloud-id:item/1';
const containerAri = 'ari:cloud:owner:demo-cloud-id:container/1';

export default (
  <div style={{ position: 'relative' }}>
    <ReactionPicker
      emojiProvider={getEmojiResource()}
      onSelection={(emojiId) => reactionsProvider.toggleReaction(containerAri, demoAri, emojiId)}
    />
    <Reactions
      ari={demoAri}
      emojiProvider={getEmojiResource()}
      reactionsProvider={reactionsProvider}
      onReactionClick={(emojiId) => reactionsProvider.toggleReaction(containerAri, demoAri, emojiId)}
    />
  </div>
);
