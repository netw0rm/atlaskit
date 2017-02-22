import { storiesOf } from '@kadira/storybook';
import * as React from 'react';

import { name } from '../package.json';
import ResourcedEmoji from '../src/components/common/ResourcedEmoji';

import { getEmojiService } from './story-data';

const emojiService = getEmojiService();

storiesOf(`${name}/Resourced Emoji`, module)
  .add('resourced emoji', () => (
    <div>
      <ResourcedEmoji
        id={{id: 'awthanks'}}
        emojiService={emojiService}
      />
      <ResourcedEmoji
        id={{id: 'not-an-emoji'}}
        emojiService={emojiService}
      />
      <ResourcedEmoji
        id={{id: 'grimacing'}}
        emojiService={emojiService}
      />
    </div>
  ));
