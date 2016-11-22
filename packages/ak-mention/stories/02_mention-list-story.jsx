import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import MentionList from '../src/components/ak-mention-list';
import { mentions } from './story-data';

function randomMentions() {
  return mentions.filter(() => Math.random() < 0.7);
}

const RefreshableMentionList = React.createClass({
  displayName: 'RefreshableMentionList',

  getInitialState() {
    return {
      mentions: randomMentions(),
    };
  },

  _updateData() {
    this.setState({
      mentions: randomMentions(),
    });
  },

  _moveUp() {
    if (this._mentionList) {
      // FIXME reactify should expose prototype methods from a wc
      this._mentionList.selectPrevious();
    }
  },

  _moveDown() {
    if (this._mentionList) {
      this._mentionList.selectNext();
    }
  },

  render() {
    const mentionList = (
      <MentionList
        mentions={this.state.mentions}
        onSelection={action('onSelection')}
        ref={(ref) => { this._mentionList = ref; }}
      />
    );

    return (
      <div>
        <div style={{ paddingBottom: '10px' }}>
          <button onClick={this._updateData} style={{ height: '30px', marginRight: '10px' }}>Random refresh</button>
          <button onClick={this._moveUp} style={{ height: '30px', marginRight: '10px' }}>Up</button>
          <button onClick={this._moveDown} style={{ height: '30px', marginRight: '10px' }}>Down</button>
        </div>
        {mentionList}
      </div>
    );
  },
});


storiesOf('Mention List', module)
  .add('simple mention list', () => <RefreshableMentionList />)
  .add('error mention list', () => (
    <div style={{ padding: '10px' }} >
      <MentionList showError mentions={[]} />
    </div>
  ));
