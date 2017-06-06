import { storiesOf, action } from '@kadira/storybook';
import * as React from 'react';

import { customCategory } from '../src/constants';
import { name } from '../package.json';
import { EmojiDescription } from '../src/types';
import ResourcedEmojiList from './demo-resourced-emoji-list';
import ResourcedEmojiControl from './demo-resource-control';
import EmojiPickerTextInput from './demo-emoji-picker-text-input';
import EmojiTypeAheadTextInput from './demo-emoji-typeahead-text-input';
import { getEmojiResource } from './story-data';

declare var require: {
    <T>(path: string): T;
};

let emojiConfig;
try {
  // tslint:disable-next-line import/no-unresolved, no-var-requires
  emojiConfig = require('../local-config')['default'];
} catch (e) {
  // tslint:disable-next-line import/no-unresolved, no-var-requires
  emojiConfig = require('../local-config-example')['default'];
}

const defaultEmojiProvider = Promise.resolve(getEmojiResource());

storiesOf(`${name}/external-emoji`, module)
  .add('resourced picker', () => {
    const picker = (
      <EmojiPickerTextInput
        onSelection={action('emoji selected')}
        position="below"
        emojiProvider={defaultEmojiProvider}
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
        afterContent={true}
        emojiProvider={defaultEmojiProvider}
      />
    );
    return (
      <ResourcedEmojiControl
        emojiConfig={emojiConfig}
        children={typeAhead}
      />
    );
  })
  .add('resource emoji - media api', () => {
    const filter = (emoji: EmojiDescription) => (emoji.category === customCategory);
    const emojiList = (
      <ResourcedEmojiList
        filter={filter}
        emojiProvider={defaultEmojiProvider}
      />
    );
    return (
      <ResourcedEmojiControl
        emojiConfig={emojiConfig}
        children={emojiList}
      />
    );
  });
