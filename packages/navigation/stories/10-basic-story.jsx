import { action, storiesOf } from '@kadira/storybook';
import React from 'react';
import { DashboardIcon, SettingsIcon, TrayIcon } from '@atlaskit/icon';
import { AkContainerItem, AkContainerLogo } from '../src/index';
import Page from './components/HtmlPage';
import BasicNavigation from './components/BasicNavigation';
import nucleus from './nucleus.png';
import bitbucketLogo from './bitbucket-logo.svg';
import { name } from '../package.json';
import RandomBadge from './components/RandomBadge';

const manyContainerItems = () => {
  const items = [];
  for (let i = 0; i < 40; i++) {
    items.push(
      <a href="#1" key={i}>
        <AkContainerItem
          text="Test page"
        />
      </a>
    );
  }
  return items;
};

storiesOf(name, module)
  .add('with a few container items', () => (
    <Page>
      <BasicNavigation>
        <a href="#1">
          <AkContainerItem
            text="Test page"
          />
        </a>
        <a href="#2">
          <AkContainerItem
            icon={<img alt="icon" src={nucleus} />}
            text="Item with an icon"
          />
        </a>
        <a href="#3">
          <AkContainerItem
            icon={<img alt="icon" src={nucleus} />}
            text="A really, really, quite long, actually super long container name"
          />
        </a>
      </BasicNavigation>
    </Page>
  ))
  .add('with many container items', () => (
    <Page>
      <BasicNavigation>
        <a href="#1">
          <AkContainerItem
            icon={<img alt="icon" src={nucleus} />}
            isSelected
            text="This one is selected"
          />
        </a>
        {manyContainerItems()}
      </BasicNavigation>
    </Page>
  ))
  .add('with a selected item', () => (
    <Page>
      <BasicNavigation>
        <a href="#1">
          <AkContainerItem
            icon={<img alt="icon" src={nucleus} />}
            isSelected
            text="Nucleus"
          />
        </a>
      </BasicNavigation>
    </Page>
  ))
  .add('with global appearance', () => (
    <Page>
      <BasicNavigation
        containerAppearance="global"
        containerHeader={
          <AkContainerLogo>
            <img alt="Bitbucket logo" src={bitbucketLogo} />
          </AkContainerLogo>
        }
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
    </Page>
  ))
  .add('that is not resizeable', () => (
    <Page>
      <BasicNavigation isResizeable={false} />
    </Page>
  ))
  .add('with isCollapsible=false', () => (
    <Page>
      <BasicNavigation isCollapsible={false} />
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
