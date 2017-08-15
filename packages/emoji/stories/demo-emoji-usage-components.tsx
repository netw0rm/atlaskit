import * as React from 'react';
import { PureComponent } from 'react';

import { EmojiProvider } from '../src/api/EmojiResource';
import ResourcedEmoji from '../src/components/common/ResourcedEmoji';

export interface EmojiUsageProps {
  emojiProvider: EmojiProvider;
  emojiIdList: Array<string>;
  emojiQueue: Array<string>;
}

export class EmojiUsageList extends PureComponent<EmojiUsageProps,any> {
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

export interface LocalStorageViewProps {
  emojiProvider: EmojiProvider;
  emojiQueue: Array<string>;
}

export class LocalStorageView extends PureComponent<LocalStorageViewProps,any> {
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
