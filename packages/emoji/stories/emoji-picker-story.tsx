import { storiesOf, action } from '@kadira/storybook';
import * as React from 'react';

import EmojiPicker from '../src/components/picker/EmojiPicker';

import { name } from '../package.json';
import TriggeredEmojiResource from './TriggeredEmojiResource';

import { emoji as emojiTestData } from '@atlaskit/util-data-test';

const { getEmojiResource, lorem } = emojiTestData.emojiStoryData;

storiesOf(`${name}/EmojiPicker`, module)
  .add('picker popup', () => (
    <div style={{ padding: '10px' }} >
      <input
        id="picker-input"
        style={{
          height: '20px',
          margin: '10px',
        }}
      />
      <p style={{ width: '400px' }}>{lorem}</p>
      <EmojiPicker
        emojiProvider={getEmojiResource()}
        onSelection={action('emoji selected')}
        target="#picker-input"
        position="below"
      />
    </div>
  ))
  .add('picker inline', () => (
    <div style={{ padding: '10px' }} >
      <p style={{ width: '400px' }}>{lorem}</p>
      <EmojiPicker
        emojiProvider={getEmojiResource()}
        onSelection={action('emoji selected')}
      />
      <p style={{ width: '400px' }}>{lorem}</p>
    </div>
  ))
  .add('slow loading picker', () => {
    let loadStandardRef;
    let loadAtlassianRef;
    const emojiResource: TriggeredEmojiResource = new TriggeredEmojiResource();

    const loadStandard = () => {
      emojiResource.triggerStandardLoaded();
      if (loadStandardRef) {
        loadStandardRef.disabled = 'disabled';
      }
    };

    const loadAtlassian = () => {
      emojiResource.triggerAtlassianLoaded();
      if (loadAtlassianRef) {
        loadAtlassianRef.disabled = 'disabled';
      }
    };

    return (
      <div style={{ padding: '10px' }} >
        <div style={{ padding: '10px' }}>
          <button onClick={loadStandard} ref={(ref) => { loadStandardRef = ref; }}>Load Standard Emojis</button>
          <button onClick={loadAtlassian} ref={(ref) => { loadAtlassianRef = ref; }}>Load Atlassian Emojis</button>
        </div>
        <EmojiPicker
          emojiProvider={Promise.resolve(emojiResource)}
          onSelection={action('emoji selected')}
        />
      </div>
    );
  });
