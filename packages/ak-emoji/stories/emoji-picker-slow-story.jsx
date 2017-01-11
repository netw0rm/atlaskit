import { storiesOf, action } from '@kadira/storybook';
import React from 'react';

import emojiService, { lorem } from './story-data';

import EmojiPickerSlow from '../src/EmojiPickerSlow';

storiesOf('ak-emoji/EmojiPickerSlow', module)
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
      <EmojiPickerSlow
        emojiService={emojiService}
        onSelection={action('emoji selected')}
        target="#picker-input"
        position="left bottom"
      />
    </div>
  ))
  .add('picker inline', () => (
    <div style={{ padding: '10px' }} >
      <p style={{ width: '400px' }}>{lorem}</p>
      <EmojiPickerSlow
        emojiService={emojiService}
        onSelection={action('emoji selected')}
      />
      <p style={{ width: '400px' }}>{lorem}</p>
    </div>
  ));
