import { storiesOf, action } from '@kadira/storybook';
import React from 'react';

import emojis from './story-data';

import EmojiPicker from '../src/EmojiPicker';

storiesOf('ak-emoji/Emoji Picker', module)
  .add('picker', () => (
    <div style={{ padding: '10px' }} >
      <EmojiPicker
        emojis={emojis}
        onEmojiSelected={action('emoji selected')}
      />
    </div>
    ));
