import React from 'react';

import { storiesOf } from '@kadira/storybook';

import BasicNav from './BasicNav';
import MockSearchResource from './helpers/MockSearchResource';
import QuickSearch from '../src';
import { name } from '../package.json';

storiesOf(name, module)
  .add('Quick-search Component', () => (
    <QuickSearch
      searchResource={new MockSearchResource(0)}
      resultCallbacks={{
        HipChatConversation: () => console.log('*click*'),
      }}
    />
  ))
  .add('In a search drawer', () => (
    <BasicNav
      searchDrawerContent={(
        <QuickSearch
          searchResource={new MockSearchResource(0)}
          resultCallbacks={{
            HipChatConversation: () => console.log('*click*'),
          }}
        />
      )}
    >
      Hi
    </BasicNav>
  ))
  .add('In a search drawer w/ short delay', () => (
    <BasicNav
      searchDrawerContent={(
        <QuickSearch
          searchResource={new MockSearchResource(300)}
          resultCallbacks={{
            HipChatConversation: () => console.log('*click*'),
          }}
        />
      )}
    >
      Hi
    </BasicNav>
  ))
  .add('In a search drawer w/ long delay', () => (
    <BasicNav
      searchDrawerContent={(
        <QuickSearch
          searchResource={new MockSearchResource(1200)}
          resultCallbacks={{
            HipChatConversation: () => console.log('*click*'),
          }}
        />
      )}
    >
      Hi
    </BasicNav>
  ));
