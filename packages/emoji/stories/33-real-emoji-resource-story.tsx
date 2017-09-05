import { storiesOf, action } from '@kadira/storybook';

import * as React from 'react';

import { name } from '../package.json';

import UploadingEmojiResource from '../src/api/EmojiResource';
import ResourcedEmojiControl from './demo-resource-control';
import EmojiPickerTextInput from './demo-emoji-picker-text-input';

declare var require: {
    <T>(path: string): T;
};

function getEmojiConfig() {
  let emojiConfig;
  try {
    // tslint:disable-next-line import/no-unresolved, no-var-requires
    emojiConfig = require('../local-config')['default'];
  } catch (e) {
    // tslint:disable-next-line import/no-unresolved, no-var-requires
    emojiConfig = require('../local-config-example')['default'];
  }

  emojiConfig.allowUpload = true;
  return emojiConfig;
}

function getEmojiResource() {
  const resource = new UploadingEmojiResource(getEmojiConfig());
  return resource;
}

const defaultEmojiProvider = Promise.resolve(getEmojiResource());

storiesOf(`${name}/real-emoji-resource`, module)
  .add('EmojiPicker with UploadingEmojiResource', () => {
    const picker = (
      <EmojiPickerTextInput
        onSelection={action('emoji selected')}
        emojiProvider={defaultEmojiProvider}
      />
    );
    return (
      <ResourcedEmojiControl
        emojiConfig={getEmojiConfig()}
        customEmojiProvider={defaultEmojiProvider}
        children={picker}
      />
    );
  });
