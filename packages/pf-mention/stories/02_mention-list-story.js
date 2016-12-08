import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import reactify from 'akutil-react';

import pfMentionList from '../src/wc/pf-mention-list';
import { mentions } from './story-data';
import { getWebComponent } from './util';
import debug from '../src/util/logger';

const MentionList = reactify(pfMentionList);

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
      getWebComponent(this._mentionList).selectPrevious();
    }
  },

  _moveDown() {
    if (this._mentionList) {
      getWebComponent(this._mentionList).selectNext();
    }
  },

  render() {
    const mentionList = (
      <MentionList
        mentions={this.state.mentions}
        onselected={(mention) => {
          debug('mention selected', mention);
          action('mention selected');
        }}
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
  .add('simple mention list', () => <RefreshableMentionList />);
