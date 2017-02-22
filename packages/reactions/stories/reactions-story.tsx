import { action, storiesOf } from '@kadira/storybook';
import * as React from 'react';
import { ReactionPicker, Reactions } from '../src';
import Reaction from '../src/internal/reaction';
import Selector from '../src/internal/selector';
import Trigger from '../src/internal/trigger';
import { emojiService } from './examples/emoji-service';
import { reactionsService } from './examples/reactions-service';

import { name } from '../package.json';

const demoAri = 'ari:cloud:demo:123:123';

storiesOf(name, module)
  .add('picker and reactions', () => (
      <div>
        <div style={{display: 'flex'}}>
          <p>Lorem ipsum dolor sit amet...</p>
          <ReactionPicker
            emojiService={emojiService}
            onSelection={(emojiId) => reactionsService.toggleReaction(demoAri, emojiId)}
          />
        </div>
        <hr />
        <Reactions
          ari={demoAri}
          emojiService={emojiService}
          reactionsService={reactionsService}
          onReactionClick={(emojiId) => reactionsService.toggleReaction(demoAri, emojiId)}
        />
      </div>
  ))
  .add('picker', () => (
    <ReactionPicker
      emojiService={emojiService}
      onSelection={action('reaction selected')}
    />
  ))
  .add('reactions', () => (
      <div>
        <p>This is a message with some reactions</p>
        <Reactions
          ari={demoAri}
          emojiService={emojiService}
          reactionsService={reactionsService}
          onReactionClick={action('reaction clicked')}
        />
      </div>
  ))
;

storiesOf(`${name}/Internal Components`, module)
  .add('reaction', () => (
    <Reaction
      reaction={{ emojiId: 'smiley', count: 1, reacted: false, ari: demoAri }}
      emojiService={emojiService}
      onClick={action('reaction clicked')}
    />
  ))
  .add('reaction - reacted', () => (
    <Reaction
      reaction={{ emojiId: 'smiley', count: 1, reacted: true, ari: demoAri }}
      emojiService={emojiService}
      onClick={action('reaction clicked')}
    />
  ))
  .add('selector', () => (
    <Selector
      emojiService={emojiService}
      onSelection={action('reaction selected')}
    />
  ))
  .add('trigger', () => (
    <Trigger
      onClick={action('trigger clicked')}
    />
  ))
;
