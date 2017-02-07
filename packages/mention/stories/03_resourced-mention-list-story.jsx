import React, { Component } from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { name } from '../package.json';
import ResourcedMentionList from '../src/components/ResourcedMentionList';
import SearchTextInput from './demo-search-text-input';
import { resourceProvider } from './story-data';

class ResourcedMentionListStoryDemo extends Component {

  constructor(props) {
    super(props);
    this._updateQuery = this._updateQuery.bind(this);
    this.state = {
      query: '',
    };
  }

  _updateQuery(query) {
    this.setState({
      query,
    });
  }

  render() {
    const mentionList = (
      <ResourcedMentionList
        onSelection={action('mention selected')}
        resourceProvider={resourceProvider}
        query={this.state.query}
        ref={(ref) => { this._resourcedMentionListRef = ref; }}
      />
    );

    return (
      <div style={{ width: '400px', padding: '10px' }}>
        <SearchTextInput
          label="User search"
          onChange={(event) => { this._updateQuery(event.target.value); }}
          onUp={() => this._resourcedMentionListRef.selectPrevious()}
          onDown={() => this._resourcedMentionListRef.selectNext()}
          onEnter={() => this._resourcedMentionListRef.chooseCurrentSelection()}
        />
        {mentionList}
      </div>
    );
  }

}

storiesOf(`${name}/ResourcedMentionList`, module)
  .add('Input field mention list.  Real API. Key binding', () => <ResourcedMentionListStoryDemo />);
