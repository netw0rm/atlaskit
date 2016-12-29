import { storiesOf, action } from '@kadira/storybook';
import React from 'react';

import { emojis, lorem } from './story-data';

import EmojiPicker from '../src/EmojiPicker';

storiesOf('ak-emoji/EmojiPicker', module)
  .add('picker popup', () => (
    <div style={{ padding: '10px' }} >
      <input id="picker-input" />
      <p style={{ width: '400px' }}>{lorem}</p>
      <EmojiPicker
        emojis={emojis}
        onSelection={action('emoji selected')}
        target="picker-input"
        position="left bottom"
      />
    </div>
  ))
  .add('picker inline', () => (
    <div style={{ padding: '10px' }} >
      <p style={{ width: '400px' }}>{lorem}</p>
      <EmojiPicker
        emojis={emojis}
        onSelection={action('emoji selected')}
      />
      <p style={{ width: '400px' }}>{lorem}</p>
    </div>
  ));
