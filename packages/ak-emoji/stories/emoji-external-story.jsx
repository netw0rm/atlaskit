import { storiesOf, action } from '@kadira/storybook';
import React from 'react';

import { name } from '../package.json';
import ResourcedEmojiControl from './demo-resource-control';

import EmojiPickerTextInput from './demo-emoji-picker-text-input';
import EmojiTypeAheadTextInput from './demo-emoji-typeahead-text-input';

import sampleEmojiConfig from '../local-config-example';

let emojiConfig;
try {
  // eslint-disable-next-line import/no-unresolved, global-require
  emojiConfig = require('../local-config').default;
} catch (e) {
  emojiConfig = sampleEmojiConfig;
}

storiesOf(`${name}/external-emoji`, module)
  .add('resourced picker', () => (
    <ResourcedEmojiControl
      emojiConfig={emojiConfig}
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
      emojiConfig={emojiConfig}
    >
      <EmojiTypeAheadTextInput
        label="Emoji search"
        onSelection={action('emoji selected')}
        position="bottom left"
        afterContent
      />
    </ResourcedEmojiControl>
  ));
