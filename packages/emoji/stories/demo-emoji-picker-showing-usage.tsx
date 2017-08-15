import * as React from 'react';
import { PureComponent } from 'react';

import Layer from '@atlaskit/layer';

import EmojiPicker from '../src/components/picker/EmojiPicker';
import { localStoragePrefix } from '../src/constants';
import { EmojiId, OptionalEmojiDescription } from '../src/types';
import { UsagePeekEmojiResource } from '../src/support/MockEmojiResource';
import { EmojiUsageList, LocalStorageView } from './demo-emoji-usage-components';


export interface Props {
  emojiResource: UsagePeekEmojiResource;
}

export interface State {
  emojiIdList: Array<string>;
  emojiQueue: Array<string>;
}

export default class UsageShowingEmojiPickerTextInput extends PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = this.getFreshState();
  }

  getFreshState(): State {
    return {
      emojiIdList: this.props.emojiResource.getFrequentlyUsed(),
      emojiQueue: this.getEmojiQueue()
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
      emojiQueue: this.getEmojiQueue()
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

    return (
      <div style={{ padding: '10px' }} >
        <Layer
          content={
            <EmojiPicker
              onSelection={onSelectionHandler}
              emojiProvider={Promise.resolve(emojiResource)}
            />
          }
          position="bottom left"
        >
        <input
          id="picker-input"
          style={{
            height: '20px',
            marginBottom: '320px',
          }}
        />
        </Layer>
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
    );
  }
}

