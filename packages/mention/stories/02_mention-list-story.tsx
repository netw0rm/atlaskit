import * as React from 'react';
import { Component } from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { name } from '../package.json';
import { Mention } from '../src/types';
import MentionList from '../src/components/MentionList';
import { mentions } from './story-data';

function randomMentions() {
  return mentions.filter(() => Math.random() < 0.7);
}

export interface Props {}

export interface State {
  mentions: Mention[];
}

class RefreshableMentionList extends Component<Props, State> {
  private mentionListRef: MentionList;

  constructor(props) {
    super(props);
    this.state = {
      mentions: randomMentions(),
    };
  }

  private updateData = () => {
    this.setState({
      mentions: randomMentions(),
    });
  }

  private moveUp = () => {
    if (this.mentionListRef) {
      // FIXME reactify should expose prototype methods from a wc
      this.mentionListRef.selectPrevious();
    }
  }

  private moveDown = () => {
    if (this.mentionListRef) {
      this.mentionListRef.selectNext();
    }
  }

  render() {
    const mentionList = (
      <MentionList
        mentions={this.state.mentions}
        onSelection={action('onSelection')}
        ref={(ref) => { this.mentionListRef = ref; }}
      />
    );

    return (
      <div>
        <div style={{ paddingBottom: '10px' }}>
          <button onClick={this.updateData} style={{ height: '30px', marginRight: '10px' }}>Random refresh</button>
          <button onClick={this.moveUp} style={{ height: '30px', marginRight: '10px' }}>Up</button>
          <button onClick={this.moveDown} style={{ height: '30px', marginRight: '10px' }}>Down</button>
        </div>
        {mentionList}
      </div>
    );
  }
}

storiesOf(`${name}/MentionList`, module)
  .add('simple mention list', () => <RefreshableMentionList />)
  .add('error mention list', () => (
    <div style={{ padding: '10px' }} >
      <MentionList showError={true} mentions={[]} />
    </div>
  ));
