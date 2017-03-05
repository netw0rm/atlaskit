import { storiesOf, action } from '@kadira/storybook';
import * as React from 'react';

import { name } from '../package.json';
import EmojiTextInput from './demo-emoji-typeahead-text-input';
import { getEmojiService } from './story-data';

const emojiService = getEmojiService();

const bottomStyle = {
  position: 'absolute',
  bottom: '30px',
};

const tallPageStyle = {
  height: '2000px',
};

const downPage = {
  position: 'absolute',
  top: '400px',
};

storiesOf(`${name}/EmojiTypeAhead`, module)
  .add('Input field emoji typeahead. Popup', () => (
    <EmojiTextInput
      label="Emoji search"
      onSelection={action('emoji selected')}
      emojiService={emojiService}
      position="below"
      afterContent
    />
  ))
  .add('Input field emoji typeahead. Inline', () => (
    <EmojiTextInput
      label="Emoji search"
      onSelection={action('emoji selected')}
      emojiService={emojiService}
      beforeContent
      afterContent
    />
  ))
  .add('Input field emoji typeahead, above.', () => (
    <div style={bottomStyle} >
      <EmojiTextInput
        label="Emoji search"
        onSelection={action('emoji selected')}
        emojiService={emojiService}
        position="above"
        beforeContent
      />
    </div>
  ))
  .add('Input field emoji typeahead part way down tall page.', () => (
    <div style={tallPageStyle} >
      <div style={downPage} >
        <EmojiTextInput
          label="Emoji search"
          onSelection={action('emoji selected')}
          emojiService={emojiService}
          position="above"
          beforeContent
          afterContent
        />
      </div>
    </div>
  ));
