import { storiesOf } from '@kadira/storybook';
import * as React from 'react';

import { name } from '../package.json';
import Emoji from '../src/components/common/Emoji';
import { getEmojiRepository } from './story-data';

const emojiService = getEmojiRepository();

const emoji = {
  id: 'atlassian-zoidberg',
  name: 'Zoidberg',
  shortName: ':zoidberg:',
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

const renderEmoji = (fitToHeight: number = 24) => {
  const awthanks = emojiService.findByShortName(':awthanks:');
  const awthanksEmoji = awthanks ? <Emoji emoji={awthanks} showTooltip={true} fitToHeight={fitToHeight} /> : <span>[awthanks emoji not found]</span>;
  const grimacing = emojiService.findByShortName(':grimacing:');
  const grimacingEmoji = grimacing ? <Emoji emoji={grimacing} showTooltip={true} fitToHeight={fitToHeight} /> : <span>[grimacing emoji not found]</span>;
  return (
    <div style={{ lineHeight: `${fitToHeight}px` }}>
      <Emoji emoji={emoji} showTooltip={true} fitToHeight={fitToHeight} />
      {awthanksEmoji}
      {grimacingEmoji}
    </div>
  );
};

storiesOf(`${name}/Emoji`, module)
  .add('simple emoji', () =>
    <div>
      <p>{renderEmoji()}</p>
      <p>{renderEmoji(32)}</p>
      <p>{renderEmoji(48)}</p>
    </div>
  ).add('simple emoji selected', () => (<Emoji emoji={emoji} selected={true} showTooltip={true} />));
