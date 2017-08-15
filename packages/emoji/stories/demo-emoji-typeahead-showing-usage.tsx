import * as React from 'react';
import { PureComponent } from 'react';

import { EmojiId, OptionalEmojiDescription } from '../src/types';
import { localStoragePrefix } from '../src/constants';
import { UsagePeekEmojiResource } from '../src/support/MockEmojiResource';
import EmojiTextInput from './demo-emoji-typeahead-text-input';
import { EmojiUsageList, LocalStorageView } from './demo-emoji-usage-components';


export interface UsagingShowingProps {
  emojiResource: UsagePeekEmojiResource;
}

export interface UsageShowingState {
  emojiIdList: Array<string>;
  emojiQueue: Array<string>;
}

export default class UsageShowingEmojiTypeAheadTextInput extends PureComponent<UsagingShowingProps, UsageShowingState> {
  constructor(props) {
    super(props);
    this.state = this.getFreshState();
  }

  getFreshState(): UsageShowingState {
    return {
      emojiIdList: this.props.emojiResource.getFrequentlyUsed(),
      emojiQueue: this.getEmojiQueue(),
    };
  }

  onSelection(emojiId: EmojiId, emoji: OptionalEmojiDescription) {
    // give the tracker a chance to write to the queue and local storage before updating state
    setTimeout(() => {
      const newState = this.getFreshState();
      this.setState(newState);
    });
  }

  clearUsageData() {
    const { emojiResource } = this.props;
    emojiResource.clearFrequentlyUsed();
    this.setState({
      emojiIdList: emojiResource.getFrequentlyUsed(),
      emojiQueue: this.getEmojiQueue(),
    });
  }

  getEmojiQueue(): Array<string> {
    const json =  window.localStorage.getItem(`${localStoragePrefix}.lastUsed`);
    if (json) {
      try {
        return JSON.parse(json);
      } catch (e) {
        // swallow any parse exception
      }
    }

    return new Array<string>();
  }

  render() {
    const { emojiResource } = this.props;

    const onSelectionHandler = this.onSelection.bind(this);
    const clearHandler = this.clearUsageData.bind(this);

    const typeahead = (
      <EmojiTextInput
        label="Emoji search"
        onSelection={onSelectionHandler}
        emojiProvider={Promise.resolve(emojiResource)}
        position="below"
      />
    );

    return (
      <div style={{ padding: '10px' }} >
        {typeahead}
        <div style={{marginTop: '300px '}}>
          <div>
            <button onClick={clearHandler}>Clear All Usage</button>
          </div>
          <EmojiUsageList
            emojiProvider={emojiResource}
            emojiIdList={this.state.emojiIdList}
            emojiQueue={this.state.emojiQueue}
          />
          <LocalStorageView
            emojiProvider={emojiResource}
            emojiQueue={this.state.emojiQueue}
          />
        </div>
      </div>
    );
  }
}
