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
            icon={<img src={nucleus} alt="icon" />}
            text="Item with an icon"
          />
        </a>
        <a href="#3">
          <AkContainerItem
            icon={<img src={nucleus} alt="icon" />}
            text="A really, really, quite long, actually super long container name"
          />
        </a>
      </BasicNavigation>
      <div>
        <Lorem count="30" />
      </div>
    </Page>
  ))
  .add('with many container items', () => (
    <Page>
      <BasicNavigation>
        <a href="#1">
          <AkContainerItem
            icon={<img src={nucleus} alt="icon" />}
            text="This one is selected"
            isSelected
          />
        </a>
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
        <a href="#1">
          <AkContainerItem
            icon={<img src={nucleus} alt="icon" />}
            text="Nucleus"
            isSelected
          />
        </a>
      </BasicNavigation>
      <div>
        <Lorem count="30" />
      </div>
    </Page>
  ))
  .add('with a global appearance', () => (
    <Page>
      <BasicNavigation
        containerAppearance="global"
        containerHeader={
          <AkContainerLogo>
            <img src={bitbucketLogo} alt="Bitbucket logo" />
          </AkContainerLogo>
        }
      >
        <AkContainerItem
          isSelected
          appearance="global"
          icon={<DashboardIcon label="Dashboard" />}
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
          icon={<img src={nucleus} alt="icon" />}
          text="This one is selected"
          isSelected
        />
        <AkContainerItem
          icon={<img src={nucleus} alt="icon" />}
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
        onSearchDrawerActivated={action('search-activated')}
        onCreateDrawerActivated={action('create-activated')}
      />
    </Page>
  ))
  .add('with create drawer open', () => (
    <Page>
      <BasicNavigation
        openDrawer="create"
      />
      <div>
        <Lorem count="30" />
      </div>
    </Page>
  ));
