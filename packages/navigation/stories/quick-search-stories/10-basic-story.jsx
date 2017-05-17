import { storiesOf } from '@kadira/storybook';
import React from 'react';

import { AtlassianIcon, CrossIcon, ArrowleftIcon } from '@atlaskit/icon';
import Spinner from '@atlaskit/spinner';

import BasicSearch from '../components/BasicSearch';
import { AkSearch, AkSearchDrawer } from '../../src';
import { name } from '../../package.json';

const BasicQuickSearch = ({ searchDelay }) => (
  <BasicSearch
    searchDelay={searchDelay}
  />
);

const DrawerSimulator3000 = ({ children }) => (
  <AkSearchDrawer
    isOpen
    backIcon={<ArrowleftIcon label="back" size="medium" />}
    primaryIcon={<AtlassianIcon label="atlassian" size="medium" />}
  >
    {children}
  </AkSearchDrawer>
);

storiesOf(`${name}/quick-search`, module)
  .add('With search delay', () => (
    <DrawerSimulator3000>
      <BasicQuickSearch searchDelay={1500} />
    </DrawerSimulator3000>
  ))
  .add('busyIcon returns to clearIcon onMouseEnter', () => (
    <DrawerSimulator3000>
      <AkSearch
        isBusy
        delayBusyStateBy={0}
        clearIcon={<CrossIcon label="clear" size="medium" />}
        busyIcon={<Spinner />}
      />
    </DrawerSimulator3000>
  ))
  ;
