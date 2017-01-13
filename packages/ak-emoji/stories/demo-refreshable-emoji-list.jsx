import React, { Component } from 'react';
import { action } from '@kadira/storybook';

import EmojiTypeAheadList from '../src/internal/typeahead/EmojiTypeAheadList';
import { storyEmojis } from './story-data';

function randomEmojis() {
  return storyEmojis.filter(() => Math.random() < 0.02).slice(0, 50);
}

export default class RefreshableEmojiList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emojis: randomEmojis(),
    };
  }

  updateData = () => {
    this.setState({
      emojis: randomEmojis(),
    });
  }

  moveUp = () => {
    if (this.emojiList) {
      this.emojiList.selectPrevious();
    }
  }

  moveDown = () => {
    if (this.emojiList) {
      this.emojiList.selectNext();
    }
  }

  render() {
    const emojiList = (
      <EmojiTypeAheadList
        emojis={this.state.emojis}
        onSelection={action('onSelection')}
        ref={(ref) => { this.emojiList = ref; }}
      />
    );

    return (
      <div>
        <div style={{ paddingBottom: '10px' }}>
          <button onClick={this.updateData} style={{ height: '30px', marginRight: '10px' }}>Random refresh</button>
          <button onClick={this.moveUp} style={{ height: '30px', marginRight: '10px' }}>Up</button>
          <button onClick={this.moveDown} style={{ height: '30px', marginRight: '10px' }}>Down</button>
        </div>
        {emojiList}
      </div>
    );
  }
}
