import * as React from 'react';
import { PureComponent } from 'react';
import { action } from '@kadira/storybook';

import EmojiTypeAheadList from '../src/components/typeahead/EmojiTypeAheadList';
import { EmojiDescription } from '../src/types';
import { emoji as emojiTestData } from '@atlaskit/util-data-test';

const { getEmojis } = emojiTestData.emojiStoryData;

function randomEmojis(): EmojiDescription[] {
  return getEmojis().filter(() => Math.random() < 0.02).slice(0, 50);
}

export interface Props {}

export interface State {
  emojis: EmojiDescription[];
}

export default class RefreshableEmojiList extends PureComponent<Props, State> {
  private emojiList: EmojiTypeAheadList;

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
        onEmojiSelected={action('onSelection')}
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
