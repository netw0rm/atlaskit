import { storiesOf, action } from '@kadira/storybook';
import * as React from 'react';

import { name } from '../package.json';
import ResourcedEmojiControl from './demo-resource-control';

import EmojiPickerTextInput from './demo-emoji-picker-text-input';
import EmojiTypeAheadTextInput from './demo-emoji-typeahead-text-input';

import sampleEmojiConfig from '../local-config-example';

declare var require: {
    <T>(path: string): T;
};

let emojiConfig;
try {
  // tslint:disable-next-line import/no-unresolved, no-var-requires
  emojiConfig = require('../local-config')['default'];
} catch (e) {
  emojiConfig = sampleEmojiConfig;
}

storiesOf(`${name}/external-emoji`, module)
  .add('resourced picker', () => {
    const picker = (
      <EmojiPickerTextInput
        onSelection={action('emoji selected')}
        position="below"
      />
    );
    return (
      <ResourcedEmojiControl
        emojiConfig={emojiConfig}
        children={picker}
      />
    );
  })
  .add('resourced typeahead', () => {
    const typeAhead = (
      <EmojiTypeAheadTextInput
        label="Emoji search"
        onSelection={action('emoji selected')}
        position="below"
        afterContent
      />
    );
    return (
      <ResourcedEmojiControl
        emojiConfig={emojiConfig}
        children={typeAhead}
      />
    );
  });
