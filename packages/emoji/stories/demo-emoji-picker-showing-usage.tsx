import * as React from 'react';
import { PureComponent } from 'react';

import Layer from '@atlaskit/layer';

import EmojiResource, { EmojiProvider, EmojiResourceConfig } from '../src/api/EmojiResource';
import EmojiPicker from '../src/components/picker/EmojiPicker';
import ResourcedEmoji from '../src/components/common/ResourcedEmoji';
import { localStoragePrefix } from '../src/constants';
import { EmojiDescription, EmojiId, OptionalEmojiDescription } from '../src/types';

export class UsagePeekEmojiResource extends EmojiResource {
  constructor(config: EmojiResourceConfig) {
    super(config);
  }

  getFrequentlyUsed(): Array<string> {
    if (this.usageTracker) {
      return this.usageTracker.getOrder();
    } else {
      return [];
    }
  }

  clear() {
    if (this.usageTracker) {
      this.usageTracker.clear();
    }
  }

  recordSelection(id: EmojiDescription): Promise<any> {
    if (super.recordSelection) {
      const promise = super.recordSelection(id);
      return promise;
    } else {
      return Promise.resolve();
    }
  }
}

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
    emojiResource.clear();
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

interface EmojiUsageProps {
  emojiProvider: EmojiProvider;
  emojiIdList: Array<string>;
  emojiQueue: Array<string>;
}

class EmojiUsageList extends PureComponent<EmojiUsageProps,any> {
  constructor(props) {
    super(props);
  }

  render() {
    let emojiUsageList;

    if (this.props.emojiIdList.length === 0) {
      emojiUsageList = (<span>None</span>);
    } else {
      emojiUsageList = (<span>
        {
          this.props.emojiIdList.map((id) => {
            return (
                <span key={id} style={{marginRight: '15px'}}>
                  <span style={{marginRight: '3px'}}>({this.props.emojiQueue.filter(emojiId => emojiId === id).length})</span>
                  <ResourcedEmoji
                    emojiId={{id: id, shortName: 'unknown'}}
                    emojiProvider={Promise.resolve(this.props.emojiProvider)}
                    showTooltip={true}
                  />
                </span>
            );
          })
        }
        </span>);
    }

    return (
      <div style={{ paddingTop: '10px', paddingBottom: '10px'}}>
        <h4>Emojis ordered by usage</h4>
        {emojiUsageList}
      </div>
    );
  }
}

interface LocalStorageViewProps {
  emojiProvider: EmojiProvider;
  emojiQueue: Array<string>;
}

class LocalStorageView extends PureComponent<LocalStorageViewProps,any> {
  constructor(props) {
    super(props);
  }

  render() {
    let renderedQueue;
    if (this.props.emojiQueue.length === 0) {
      renderedQueue = (<span>None</span>);
    } else {
      renderedQueue = (<span>
        {
          this.props.emojiQueue.map((id, index) => {
            return (
                <span key={index} style={{marginRight: '3px'}}>
                  <ResourcedEmoji
                    emojiId={{id: id, shortName: 'unknown'}}
                    emojiProvider={Promise.resolve(this.props.emojiProvider)}
                    showTooltip={false}
                  />
                  <span>({id})</span>
                </span>
            );
          })
        }
        </span>);
    }

    return (
      <div style={{ paddingTop: '10px', paddingBottom: '10px'}}>
        <h4>Emoji Queue (from localStorage)</h4>
        <pre style={{whiteSpace: 'pre-wrap', wordWrap: 'break-word'}}>{renderedQueue}</pre>
      </div>
    );
  }
}
