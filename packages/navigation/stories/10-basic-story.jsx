import { action, storiesOf } from '@kadira/storybook';
import React from 'react';
import Lorem from 'react-lorem-component';
import { DashboardIcon, SettingsIcon, ProjectsIcon } from 'ak-icon';
import { AkContainerItem, AkContainerLogo } from '../src/index';
import Page from './components/Page';
import BasicNavigation from './components/BasicNavigation';
import nucleus from './nucleus.png';
import bitbucketLogo from './bitbucket-logo.svg';
import { name } from '../package.json';
import RandomBadge from './components/RandomBadge';

const manyContainerItems = () => {
  const items = [];
  for (let i = 0; i < 20; i++) {
    items.push(
      <AkContainerItem
        href="#1"
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
          href="#1"
        />
        <AkContainerItem
          icon={<img src={nucleus} alt="icon" />}
          text="Item with an icon"
          href="#2"
        />
        <AkContainerItem
          icon={<img src={nucleus} alt="icon" />}
          text="Item with two lines"
          subText="Another line of text, which could possibly be long"
          href="#3"
        />
        <AkContainerItem
          icon={<img src={nucleus} alt="icon" />}
          text="A really, really, quite long, actually super long container name"
          href="#4"
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
          icon={<img src={nucleus} alt="icon" />}
          text="This one is selected"
          href="#1"
          isSelected
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
          href="#1"
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
          icon={<ProjectsIcon label="Projects" />}
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
