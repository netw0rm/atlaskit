import React from 'react';

import { storiesOf } from '@kadira/storybook';

import BasicNav from '../../navigation/stories/components/BasicNavigation';
import QuickSearch, { ParsingSearchResource } from '../src/';
import { name } from '../package.json';

const searchResource = new ParsingSearchResource({
  userId: '655363:7c218e11-d210-43fd-9830-bcc1874e4736',
  cloudId: 'DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5',
});

storiesOf(name, module)
  .add('Quick-search Component', () => (
    <QuickSearch
      searchResource={searchResource}
      resultCallbacks={{
        HipChatConversation: () => console.log('*click*'),
      }}
    />
  ))
  .add('In a search drawer', () => (
    <BasicNav
      searchDrawerContent={(
        <QuickSearch
          searchResource={searchResource}
          resultCallbacks={{
            HipChatConversation: () => console.log('*click*'),
          }}
        />
      )}
    >
      Hi
    </BasicNav>
  ));
