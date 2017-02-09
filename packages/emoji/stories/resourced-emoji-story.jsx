import { storiesOf } from '@kadira/storybook';
import React from 'react';

import { name } from '../package.json';
import ResourcedEmoji from '../src/ResourcedEmoji';

import emojiService from './story-data';

storiesOf(`${name}/Resourced Emoji`, module)
  .add('resourced emoji', () => (
    <div>
      <ResourcedEmoji
        shortcut="wtf"
        emojiService={emojiService}
      />
      <ResourcedEmoji
        shortcut="not-an-emoji"
        emojiService={emojiService}
      />
      <ResourcedEmoji
        shortcut="grimacing"
        emojiService={emojiService}
      />
    </div>
  ));
