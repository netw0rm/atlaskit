import { storiesOf, action } from '@kadira/storybook';
import * as React from 'react';

import { name } from '../package.json';
import { getEmojis, getStandardEmojis, getAtlassianEmojis } from './story-data';

import CategorySelector from '../src/components/picker/CategorySelector';
import EmojiPickerFooter from '../src/components/picker/EmojiPickerFooter';
import EmojiPreview from '../src/components/common/EmojiPreview';
import ToneSelector from '../src/components/common/ToneSelector';
import EmojiTypeAheadList from '../src/components/typeahead/EmojiTypeAheadList';

import { emojiPickerWidth } from '../src/shared-styles';
import filters from '../src/util/filters';

import RefreshableEmojiList from './demo-refreshable-emoji-list';

const emoji = {
  id: '118608',
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
  hasSkinVariations: false,
};

const emojis = getEmojis();

const tongueEmoji = filters.byShortName(emojis, ':stuck_out_tongue_closed_eyes:');
const longTongueEmoji = {
  ...tongueEmoji,
  name: `${tongueEmoji.name} ${tongueEmoji.name} ${tongueEmoji.name}`,
  shortName: `${tongueEmoji.shortName}_${tongueEmoji.shortName}_${tongueEmoji.shortName}`,
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
    const newEmoji = { ...emoji, name: undefined };
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
      onEmojiSelected={action('onSelection')}
    />
  ))
  .add('fallback emoji rendering', () => {
    const emojis = [
      ...getStandardEmojis(),
      ...getAtlassianEmojis().slice(0, 20),
    ];
    return (
      <div>
        {emojis.map(emoji => {
          return (<span key={emoji.id}>{emoji.fallback} </span>);
        })}
      </div>
    );
  });
