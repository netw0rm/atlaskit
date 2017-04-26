import { action, storiesOf } from '@kadira/storybook';
import React from 'react';
import { CalendarIcon, DashboardIcon, SettingsIcon, TrayIcon } from '@atlaskit/icon';
import { AtlassianLogo } from '@atlaskit/logo';
import navigationStencil from 'url-loader!./stencils/navigation.svg';
import { AkNavigationItem, AkNavigationItemGroup, AkContainerTitle } from '../src/index';
import Page from './components/HtmlPage';
import BasicNavigation from './components/BasicNavigation';
import nucleusLogo from './nucleus.png';
import { name } from '../package.json';
import RandomBadge from './components/RandomBadge';

const manyNavigationItems = () => {
  const items = [];
  for (let i = 0; i < 40; i++) {
    items.push(
      <AkNavigationItem
        href={`#${i}`}
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
        <AkNavigationItem
          text="Test page"
          href="#1"
        />
        <AkNavigationItem
          icon={<img src={nucleusLogo} alt="icon" />}
          text="Item with an icon"
          href="#2"
        />
        <AkNavigationItem
          icon={<img src={nucleusLogo} alt="icon" />}
          text="Item with two lines"
          subText="Another line of text, which could possibly be long"
          href="#3"
        />
        <AkNavigationItem
          icon={<img src={nucleusLogo} alt="icon" />}
          text="A really, really, quite long, actually super long container name"
          href="#4"
        />
      </BasicNavigation>
    </Page>
  ))
  .add('with many container items', () => (
    <Page>
      <BasicNavigation>
        <AkNavigationItem
          icon={<img alt="icon" src={nucleusLogo} />}
          isSelected
          text="This one is selected"
        />
        {manyNavigationItems()}
      </BasicNavigation>
    </Page>
  ))
  .add('with a selected item', () => (
    <Page>
      <BasicNavigation>
        <AkNavigationItem
          icon={<img alt="icon" src={nucleusLogo} />}
          isSelected
          text="Nucleus"
        />
      </BasicNavigation>
    </Page>
  ))
  .addStencilStory('with a stencil in the open state', () => (
    <Page>
      <BasicNavigation />
    </Page>
  ), { image: navigationStencil })
  .add('with global appearance', () => (
    <Page>
      <BasicNavigation
        containerAppearance="global"
        containerHeaderComponent={AtlassianLogo}
      >
        <AkNavigationItem
          appearance="global"
          icon={<DashboardIcon label="Dashboard" />}
          isSelected
          text="Selected"
          textAfter={<RandomBadge theme="dark" />}
        />
        <AkNavigationItem
          appearance="global"
          icon={<SettingsIcon label="Settings" />}
          text="Item B"
          textAfter={<RandomBadge theme="dark" />}
        />
        <AkNavigationItem
          appearance="global"
          icon={<TrayIcon label="Tray" />}
          text="Item C"
          isSelected
          textAfter={<RandomBadge theme="dark" />}
        />
        <AkNavigationItemGroup hasSeparator appearance="global">
          <AkNavigationItem
            appearance="global"
            isSelected
            icon={<CalendarIcon label="Calendar" />}
            subText="And a very long second line of text"
            text="A very long first line of text"
            textAfter={<RandomBadge />}
          />
        </AkNavigationItemGroup>
      </BasicNavigation>
    </Page>
  ))
  .add('with settings appearance', () => (
    <Page>
      <BasicNavigation
        containerHeaderComponent={() => (
          <AkContainerTitle
            appearance="settings"
            href="#foo"
            icon={
              <img alt="nucleus" src={nucleusLogo} />
            }
            text="AtlasKit"
            subText="Project settings"
          />
        )}
        containerAppearance="settings"
        globalAppearance="settings"
      >
        <AkNavigationItemGroup>
          <AkNavigationItem
            appearance="settings"
            icon={<DashboardIcon label="Dashboard" />}
            isSelected
            text="Item A"
            textAfter={<RandomBadge theme="dark" />}
          />
          <AkNavigationItem
            appearance="settings"
            icon={<SettingsIcon label="Settings" />}
            text="Item B"
            textAfter={<RandomBadge theme="dark" />}
          />
          <AkNavigationItem
            appearance="settings"
            icon={<TrayIcon label="Tray" />}
            text="Item C"
          />
          <AkNavigationItemGroup hasSeparator appearance="settings" title="Alpha">
            <AkNavigationItem
              appearance="settings"
              text="Item D"
              textAfter={<RandomBadge theme="dark" />}
            />
            <AkNavigationItem
              appearance="settings"
              text="Item E"
              isSelected
              textAfter={<RandomBadge />}
            />
          </AkNavigationItemGroup>
        </AkNavigationItemGroup>
        <AkNavigationItemGroup appearance="settings" title="Beta">
          <AkNavigationItem
            appearance="settings"
            icon={<CalendarIcon label="Calendar" />}
            text="Item X"
          />
          <AkNavigationItem
            icon={<img src={nucleusLogo} alt="icon" />}
            text="Item Y"
            href="#2"
          />
        </AkNavigationItemGroup>
      </BasicNavigation>
    </Page>
  ))
  .add('with multiple groups', () => (
    <Page>
      <BasicNavigation
        containerAppearance="global"
        containerHeaderComponent={AtlassianLogo}
      >
        <AkNavigationItemGroup>
          <AkNavigationItem
            appearance="global"
            icon={<DashboardIcon label="Dashboard" />}
            isSelected
            text="Selected"
            textAfter={<RandomBadge theme="dark" />}
          />
        </AkNavigationItemGroup>
        <AkNavigationItemGroup>
          <AkNavigationItem
            appearance="global"
            icon={<SettingsIcon label="Settings" />}
            text="Item B"
            textAfter={<RandomBadge theme="dark" />}
          />
        </AkNavigationItemGroup>
        <AkNavigationItemGroup title="one section">
          <AkNavigationItem
            appearance="global"
            icon={<TrayIcon label="Tray" />}
            text="Item C"
            textAfter={<RandomBadge theme="dark" />}
          />
        </AkNavigationItemGroup>
        <AkNavigationItemGroup hasSeparator appearance="global">
          <AkNavigationItem
            appearance="global"
            icon={<CalendarIcon label="Calendar" />}
            subText="And a very long second line of text"
            text="A very long first line of text"
            textAfter={<RandomBadge />}
          />
        </AkNavigationItemGroup>
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
        <AkNavigationItem
          icon={<img alt="icon" src={nucleusLogo} />}
          isSelected
          text="This one is selected"
        />
        <AkNavigationItem
          icon={<img alt="icon" src={nucleusLogo} />}
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
  ))
  .add('with a long ContainerTitle', () => (
    <Page>
      <BasicNavigation
        containerHeaderComponent={() => (
          <AkContainerTitle
            href="#foo"
            icon={
              <img alt="nucleus" src={nucleusLogo} />
            }
            text="A long long time ago, I can still remember"
            subText="How that music used to make me smile"
          />
        )}
      />
    </Page>
  ))
  .add('with no ContainerTitle subText', () => (
    <Page>
      <BasicNavigation
        containerHeaderComponent={() => (
          <AkContainerTitle
            href="#foo"
            icon={
              <img alt="nucleus" src={nucleusLogo} />
            }
            text="AtlasKit"
          />
        )}
      />
    </Page>
  ));
