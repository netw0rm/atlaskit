import React from 'react';
import { storiesOf } from '@kadira/storybook';

import { name } from '../package.json';
import QuickSearch from '../src/';
import { ParsingSearchResource } from '../src/api/SearchResource';
// import MockSearchResource from '../test/helpers/MockSearchResource';
import BasicNav from '../../navigation/stories/components/BasicNavigation';

const searchResource = new ParsingSearchResource({
  userId: '655363:7c218e11-d210-43fd-9830-bcc1874e4736',
  cloudId: 'DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5',
});
// const searchResource = new MockSearchResource(200);

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
