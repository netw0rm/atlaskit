import * as React from 'react';
import { PureComponent, ReactElement } from 'react';

import ResourcedEmojiControl from './demo-resource-control';

import EmojiResource, { EmojiProvider, EmojiResourceConfig } from '../src/api/EmojiResource';
import ResourcedEmoji from '../src/components/common/ResourcedEmoji';
import { localStoragePrefix } from '../src/constants';
import { EmojiDescription } from '../src/types';

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
  emojiConfig: EmojiResourceConfig;
  children: ReactElement<any>;
}

export interface State {
  emojiResource: UsagePeekEmojiResource;
  emojiConfig: EmojiResourceConfig;
  emojiIdList: Array<string>;
  emojiQueue: Array<string>;
}

const getEmojiQueue = ():Array<string> => {
  const json =  window.localStorage.getItem(`${localStoragePrefix}.lastUsed`);
  if (json) {
    try {
      return JSON.parse(json);
    } catch (e) {
      // swallow any parse exception
    }
  }

  return new Array<string>();
};

export default class ResourceEmojiControlShowingUsage extends PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      emojiResource: props.emojiResource,
      emojiConfig: props.emojiConfig,
      emojiIdList: props.emojiResource.getFrequentlyUsed(),
      emojiQueue: getEmojiQueue()
    };
  }

  render() {
    const resourceRefresher = (config: EmojiResourceConfig) =>  new UsagePeekEmojiResource(config);

    // TODO refreshing the resource will break the display of frequently used emoji
    // since the story will now be referencing a different UsagePeekEmojiResource. However refreshing
    // the resource doesn't actually work in the stories at the moment...

    const clearUsageData = () => {
      const resource = this.state.emojiResource;
      resource.clear();
      this.setState({
        emojiIdList: resource.getFrequentlyUsed(),
        emojiQueue: getEmojiQueue()
      });
    };

    // TODO do away with the need for a frequently used button. Just update the display on each selection

    return (
      <div>
        <ResourcedEmojiControl
          emojiResource={this.state.emojiResource}
          resourceRefresher={resourceRefresher}
          emojiConfig={this.state.emojiConfig}
          children={this.props.children}
        />
        <div>
          <button onClick={clearUsageData}>Clear All Usage</button>
        </div>
        <EmojiUsageList
          emojiProvider={this.state.emojiResource}
          emojiIdList={this.state.emojiIdList}
          emojiQueue={this.state.emojiQueue}
        />
        <LocalStorageView
          emojiProvider={this.state.emojiResource}
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
                <span style={{marginRight: '15px'}}>
                  <span style={{marginRight: '3px'}}>({this.props.emojiQueue.filter(emojiId => emojiId === id).length})</span>
                  <ResourcedEmoji
                    key={id}
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
          this.props.emojiQueue.map((id) => {
            return (
                <span style={{marginRight: '3px'}}>
                  <ResourcedEmoji
                    key={id}
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
