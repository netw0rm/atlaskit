import { action, storiesOf } from '@kadira/storybook';
import React from 'react';
import Lorem from 'react-lorem-component';

import { DashboardIcon, SettingsIcon, TrayIcon } from '@atlaskit/icon';
import { AtlassianLogo } from '@atlaskit/logo';
import { AkContainerItem } from '../src/index';
import Page from './components/Page';
import BasicNavigation from './components/BasicNavigation';
import nucleus from './nucleus.png';
import { name } from '../package.json';
import RandomBadge from './components/RandomBadge';

const manyContainerItems = () => {
  const items = [];
  for (let i = 0; i < 20; i++) {
    items.push(
      <AkContainerItem
        key={i}
        text="Test page"
      />
    );
  }
  return items;
};

storiesOf(name, module)
  .add('with a few container items', () => (
    <Page>
      <BasicNavigation>
        <AkContainerItem
          text="Test page"
        />
        <AkContainerItem
          icon={<img alt="icon" src={nucleus} />}
          text="Item with an icon"
        />
        <AkContainerItem
          icon={<img alt="icon" src={nucleus} />}
          text="A really, really, quite long, actually super long container name"
        />
      </BasicNavigation>
      <div>
        <Lorem count="30" />
      </div>
    </Page>
  ))
  .add('with many container items', () => (
    <Page>
      <BasicNavigation>
        <AkContainerItem
          icon={<img alt="icon" src={nucleus} />}
          isSelected
          text="This one is selected"
        />
        {manyContainerItems()}
      </BasicNavigation>
      <div>
        <Lorem count="30" />
      </div>
    </Page>
  ))
  .add('with a selected item', () => (
    <Page>
      <BasicNavigation>
        <AkContainerItem
          icon={<img alt="icon" src={nucleus} />}
          isSelected
          text="Nucleus"
        />
      </BasicNavigation>
      <div>
        <Lorem count="30" />
      </div>
    </Page>
  ))
  .add('with global appearance', () => (
    <Page>
      <BasicNavigation
        containerAppearance="global"
        containerHeaderComponent={AtlassianLogo}
      >
        <AkContainerItem
          appearance="global"
          icon={<DashboardIcon label="Dashboard" />}
          isSelected
          text="Selected"
          textAfter={<RandomBadge theme="dark" />}
        />
        <AkContainerItem
          appearance="global"
          icon={<SettingsIcon label="Settings" />}
          text="Item B"
          textAfter={<RandomBadge theme="dark" />}
        />
        <AkContainerItem
          appearance="global"
          icon={<TrayIcon label="Tray" />}
          text="Item C"
          textAfter={<RandomBadge theme="dark" />}
        />
      </BasicNavigation>
      <div>
        <Lorem count="30" />
      </div>
    </Page>
  ))
  .add('that is not resizeable', () => (
    <Page>
      <BasicNavigation isResizeable={false} />
      <div>
        <Lorem count="30" />
      </div>
    </Page>
  ))
  .add('with isCollapsible=false', () => (
    <Page>
      <BasicNavigation isCollapsible={false} />
      <div>
        <Lorem count="30" />
      </div>
    </Page>
  ))
  .add('that starts closed', () => (
    <Page>
      <BasicNavigation isOpen={false}>
        <AkContainerItem
          icon={<img alt="icon" src={nucleus} />}
          isSelected
          text="This one is selected"
        />
        <AkContainerItem
          icon={<img alt="icon" src={nucleus} />}
          text="This one is not selected"
        />
      </BasicNavigation>
      <div>
        <Lorem count="30" />
      </div>
    </Page>
  ))
  .add('with controllable drawers', () => (
    <Page>
      <BasicNavigation
        onCreateDrawerClose={action('create-close')}
        onCreateDrawerOpen={action('create-open')}
        onSearchDrawerClose={action('search-close')}
        onSearchDrawerOpen={action('search-open')}
      />
    </Page>
  ));
