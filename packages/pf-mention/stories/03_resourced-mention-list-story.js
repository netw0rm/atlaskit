import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import reactify from 'akutil-react';

import pfResourcedMentionList from '../src/wc/pf-resourced-mention-list';
import SearchTextInput from './demo-search-text-input';
import { resourceProvider } from './story-data';
import { getWebComponent } from './util';

const ResourcedMentionList = reactify(pfResourcedMentionList);

storiesOf('Resourced Mention List', module)
  .add('Input field mention list.  Real API. Key binding', () => {
    let resourcedMentionListRef;

    const mentionList = (
      <ResourcedMentionList
        onselected={action('mention selected')}
        resourceProvider={resourceProvider}
        ref={(ref) => { resourcedMentionListRef = getWebComponent(ref); }}
      />
    );

    return (
      <div style={{ width: '400px' }}>
        <SearchTextInput
          label="User search"
          onChange={(event) => { resourcedMentionListRef.query = event.target.value; }}
          onUp={() => resourcedMentionListRef.selectPrevious()}
          onDown={() => resourcedMentionListRef.selectNext()}
          onEnter={() => resourcedMentionListRef.chooseCurrentSelection()}
        />
        {mentionList}
      </div>
    );
  });
