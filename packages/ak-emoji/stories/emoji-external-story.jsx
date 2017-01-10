import { storiesOf, action } from '@kadira/storybook';
import React from 'react';

import ResourcedEmojiControl from './demo-resource-control';

import EmojiPickerTextInput from './demo-emoji-picker-text-input';
import EmojiTypeAheadTextInput from './demo-emoji-typeahead-text-input';

const emojiUrlConfig = process.env.STORYBOOK_EMOJI_URL || '';
const emojiUrls = emojiUrlConfig.split(',');

storiesOf('ak-emoji/external-emoji', module)
  .add('resourced picker', () => (
    <ResourcedEmojiControl
      emojiUrls={emojiUrls}
    >
      <EmojiPickerTextInput
        label="Emoji search"
        onSelection={action('emoji selected')}
        position="bottom left"
        afterContent
      />
    </ResourcedEmojiControl>
  ))
  .add('resourced typeahead', () => (
    <ResourcedEmojiControl
      emojiUrls={emojiUrls}
    >
      <EmojiTypeAheadTextInput
        label="Emoji search"
        onSelection={action('emoji selected')}
        position="bottom left"
        afterContent
      />
    </ResourcedEmojiControl>
  ));
