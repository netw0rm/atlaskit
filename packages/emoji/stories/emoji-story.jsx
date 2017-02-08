import { storiesOf } from '@kadira/storybook';
import React from 'react';

import { name } from '../package.json';
import Emoji from '../src/components/common/Emoji';

import emojiService from './story-data';

const emoji = {
  id: '118608',
  name: null,
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
  hasSkinVariations: false,
};

storiesOf(`${name}/Emoji`, module)
  .add('simple emoji', () => (
    <div>
      <Emoji {...emoji} />
      <Emoji {...emojiService.findByShortcut('wtf')} />
      <Emoji {...emojiService.findByShortcut('grimacing')} />
    </div>
  )).add('simple emoji selected', () => {
    const selectedEmoji = {
      ...emoji,
      selected: true,
    };

    return (
      <Emoji {...selectedEmoji} />
    );
  });
