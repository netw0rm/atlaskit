import { storiesOf, action } from '@kadira/storybook';
import React from 'react';

import { name } from '../package.json';
import { storyEmojiService, lorem } from './story-data';

import EmojiPicker from '../src/EmojiPicker';

storiesOf(`${name}/EmojiPicker`, module)
  .add('picker popup', () => (
    <div style={{ padding: '10px' }} >
      <input
        id="picker-input"
        style={{
          height: '20px',
          margin: '10px',
        }}
      />
      <p style={{ width: '400px' }}>{lorem}</p>
      <EmojiPicker
        emojiService={storyEmojiService}
        onSelection={action('emoji selected')}
        target="#picker-input"
        position="left bottom"
      />
    </div>
  ))
  .add('picker inline', () => (
    <div style={{ padding: '10px' }} >
      <p style={{ width: '400px' }}>{lorem}</p>
      <EmojiPicker
        emojiService={storyEmojiService}
        onSelection={action('emoji selected')}
      />
      <p style={{ width: '400px' }}>{lorem}</p>
    </div>
  ));
