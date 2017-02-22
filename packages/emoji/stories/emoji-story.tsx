import { storiesOf } from '@kadira/storybook';
import * as React from 'react';

import { name } from '../package.json';
import Emoji from '../src/components/common/Emoji';
import { getEmojiService } from './story-data';

const emojiService = getEmojiService();

const emoji = {
  id: '118608',
  name: 'Zoidberg',
  shortcut: 'zoidberg',
  type: 'ATLASSIAN',
  category: 'ATLASSIAN',
  order: 2147483647,
  skinVariations: [],
  representation: {
    imagePath: 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/zoidberg-1417754444.png',
    height: 24,
    width: 30,
  },
};

storiesOf(`${name}/Emoji`, module)
  .add('simple emoji', () => {
    const awthanks = emojiService.findByShortcut('awthanks');
    const awthanksEmoji = awthanks ? <Emoji emoji={awthanks} /> : <span>[awthanks emoji not found]</span>;
    const grimacing = emojiService.findByShortcut('grimacing');
    const grimacingEmoji = grimacing ? <Emoji emoji={grimacing} /> : <span>[grimacing emoji not found]</span>;
    return (
      <div>
        <Emoji emoji={emoji} />
        {awthanksEmoji}
        {grimacingEmoji}
      </div>
    );
  }).add('simple emoji selected', () => (<Emoji emoji={emoji} selected />));
