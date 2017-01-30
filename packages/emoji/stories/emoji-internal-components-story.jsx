import { storiesOf, action } from '@kadira/storybook';
import React from 'react';

import { name } from '../package.json';
import { emojis } from './story-data';

import CategorySelector from '../src/internal/picker/CategorySelector';
import EmojiPickerFooter from '../src/internal/picker/EmojiPickerFooter';
import EmojiPreview from '../src/internal/common/EmojiPreview';
import ToneSelector from '../src/internal/common/ToneSelector';
import EmojiTypeAheadList from '../src/internal/typeahead/EmojiTypeAheadList';

import { emojiPickerWidth } from '../src/shared-variables';
import filters from '../src/internal/filters';

import RefreshableEmojiList from './demo-refreshable-emoji-list';

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
  hasSkinVariations: false,
};

const tongueEmoji = filters.byShortcut(emojis, 'stuck_out_tongue_closed_eyes');
const longTongueEmoji = {
  ...tongueEmoji,
  name: `${tongueEmoji.name} ${tongueEmoji.name} ${tongueEmoji.name}`,
  shortcut: `${tongueEmoji.shortcut}_${tongueEmoji.shortcut}_${tongueEmoji.shortcut}`,
};

const toneEmoji = filters.toneEmoji(emojis);

const borderedStyle = {
  margin: '20px',
  border: '1px solid #ddd',
  backgroundColor: 'white',
  width: emojiPickerWidth,
};

storiesOf(`${name}/Internal components`, module)
  .add('emoji preview with description', () => (
    <div style={borderedStyle} >
      <EmojiPreview emoji={emoji} />
    </div>
  ))
  .add('emoji preview without description', () => {
    const newEmoji = { ...emoji, name: null };
    return (
      <div style={borderedStyle} >
        <EmojiPreview emoji={newEmoji} />
      </div>
    );
  })
  .add('emoji preview with long name and description', () => (
    <div style={borderedStyle} >
      <EmojiPreview emoji={longTongueEmoji} />
    </div>
  ))
  .add('emoji preview with long name and description with tone selector', () => (
    <div style={borderedStyle} >
      <EmojiPreview emoji={longTongueEmoji} toneEmoji={toneEmoji} />
    </div>
  ))
  .add('category selector', () => (
    <CategorySelector
      activeCategoryId="OBJECT"
      availableCategories={{
        PEOPLE: true,
        NATURE: true,
        FOODS: true,
      }}
    />
    ))
  .add('picker footer', () => (
    <EmojiPickerFooter
      selectedEmoji={emojis[0]}
      emojis={emojis}
    />
    ))
  .add('tone selector', () => (
    <ToneSelector
      emoji={toneEmoji}
      onToneSelected={action('tone selected')}
    />
  ))
  .add('emoji list', () => <RefreshableEmojiList />)
  .add('emoji list - everything', () => (
    <EmojiTypeAheadList
      emojis={emojis}
      onSelection={action('onSelection')}
    />
  ));
