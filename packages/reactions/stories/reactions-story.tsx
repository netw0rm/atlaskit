import { action, storiesOf } from '@kadira/storybook';
import * as React from 'react';
import { ReactionPicker, Reactions, ResourcedReactions, ResourcedReactionPicker } from '../src';
import Reaction from '../src/internal/reaction';
import Selector, { defaultReactionsByShortcut } from '../src/internal/selector';
import Trigger from '../src/internal/trigger';
import { reactionsProvider, reactionsProviderPromise } from './examples/reactions-provider';

import { emoji as emojiTestData } from '@atlaskit/util-data-test';

const { getEmojiResource } = emojiTestData.emojiStoryData;

import { name } from '../package.json';

const demoAri = 'ari:cloud:demo:123:123';

storiesOf(name, module)
  .add('Picker and Reactions', () => (
    <div>
      <div style={{display: 'flex'}}>
        <p>Lorem ipsum dolor sit amet...</p>
        <ReactionPicker
          emojiProvider={getEmojiResource()}
          onSelection={(emojiId) => reactionsProvider.toggleReaction(demoAri, emojiId)}
        />
      </div>
      <hr />
      <Reactions
        ari={demoAri}
        emojiProvider={getEmojiResource()}
        reactionsProvider={reactionsProvider}
        onReactionClick={(emojiId) => reactionsProvider.toggleReaction(demoAri, emojiId)}
      />
    </div>
  ))
  .add('Picker', () => (
    <ReactionPicker
      emojiProvider={getEmojiResource()}
      onSelection={action('reaction selected')}
    />
  ))
  .add('Reactions', () => (
    <div>
      <p>This is a message with some reactions</p>
      <Reactions
        ari={demoAri}
        emojiProvider={getEmojiResource()}
        reactionsProvider={reactionsProvider}
        onReactionClick={action('reaction clicked')}
      />
    </div>
  ))
;

storiesOf(`${name}/Resourced Components`, module)
  .add('Resourced Picker and Reactions', () => (
    <div>
      <div style={{display: 'flex'}}>
        <p>Lorem ipsum dolor sit amet...</p>
        <ResourcedReactionPicker
          ari={demoAri}
          emojiProvider={getEmojiResource()}
          reactionsProvider={reactionsProviderPromise}
        />
      </div>
      <hr />
      <ResourcedReactions
        ari={demoAri}
        emojiProvider={getEmojiResource()}
        reactionsProvider={reactionsProviderPromise}
      />
    </div>
  ))
  .add('Resourced Reaction Picker', () => (
    <ResourcedReactionPicker
      ari={demoAri}
      emojiProvider={getEmojiResource()}
      reactionsProvider={reactionsProviderPromise}
    />
  ))
  .add('Resourced Reactions', () => (
    <div>
      <p>This is a message with some reactions</p>
      <ResourcedReactions
        ari={demoAri}
        emojiProvider={getEmojiResource()}
        reactionsProvider={reactionsProviderPromise}
      />
    </div>
  ))
;

storiesOf(`${name}/Internal Components`, module)
  .add('Reaction', () => (
    <Reaction
      reaction={{ emojiId: defaultReactionsByShortcut.get('smiley') as string, count: 1, reacted: false, ari: demoAri }}
      emojiProvider={getEmojiResource()}
      onClick={action('reaction clicked')}
    />
  ))
  .add('Reaction - reacted', () => (
    <Reaction
      reaction={{ emojiId: defaultReactionsByShortcut.get('smiley') as string, count: 1, reacted: true, ari: demoAri }}
      emojiProvider={getEmojiResource()}
      onClick={action('reaction clicked')}
    />
  ))
  .add('Selector', () => (
    <Selector
      emojiProvider={getEmojiResource()}
      onSelection={action('reaction selected')}
    />
  ))
  .add('Trigger', () => (
    <Trigger
      onClick={action('trigger clicked')}
    />
  ))
;
