import { action, storiesOf } from '@kadira/storybook';
import React from 'react';
import { CalendarIcon, DashboardIcon, SettingsIcon, TrayIcon } from '@atlaskit/icon';
import { AtlassianLogo } from '@atlaskit/logo';
import { AkContainerItem, AkContainerItemGroup } from '../src/index';
import Page from './components/HtmlPage';
import BasicNavigation from './components/BasicNavigation';
import nucleus from './nucleus.png';
import { name } from '../package.json';
import RandomBadge from './components/RandomBadge';

const manyContainerItems = () => {
  const items = [];
  for (let i = 0; i < 40; i++) {
    items.push(
      <AkContainerItem
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
          isSelected
          textAfter={<RandomBadge theme="dark" />}
        />
        <AkContainerItemGroup hasSeparator appearance="global">
          <AkContainerItem
            appearance="global"
            isSelected
            icon={<CalendarIcon label="Calendar" />}
            subText="And a very long second line of text"
            text="A very long first line of text"
            textAfter={<RandomBadge />}
          />
        </AkContainerItemGroup>
      </BasicNavigation>
    </Page>
  ))
  .add('with project settings appearance', () => (
    <Page>
      <BasicNavigation
        containerAppearance="settings"
        globalAppearance="settings"
      >
        <AkContainerItemGroup>
          <AkContainerItem
            appearance="settings"
            icon={<DashboardIcon label="Dashboard" />}
            isSelected
            text="Item A"
            textAfter={<RandomBadge theme="dark" />}
          />
          <AkContainerItem
            appearance="settings"
            icon={<SettingsIcon label="Settings" />}
            text="Item B"
            textAfter={<RandomBadge theme="dark" />}
          />
          <AkContainerItem
            appearance="settings"
            icon={<TrayIcon label="Tray" />}
            text="Item C"
          />
          <AkContainerItemGroup hasSeparator appearance="settings" title="Alpha">
            <AkContainerItem
              appearance="settings"
              text="Item D"
              textAfter={<RandomBadge theme="dark" />}
            />
            <AkContainerItem
              appearance="settings"
              text="Item E"
              isSelected
              textAfter={<RandomBadge />}
            />
          </AkContainerItemGroup>
        </AkContainerItemGroup>
        <AkContainerItemGroup appearance="settings" title="Beta">
          <AkContainerItem
            appearance="settings"
            icon={<CalendarIcon label="Calendar" />}
            text="Item X"
          />
          <AkContainerItem
            icon={<img src={nucleus} alt="icon" />}
            text="Item Y"
            href="#2"
          />
        </AkContainerItemGroup>
      </BasicNavigation>
    </Page>
  ))
  .add('with multiple groups', () => (
    <Page>
      <BasicNavigation
        containerAppearance="global"
        containerHeaderComponent={AtlassianLogo}
      >
        <AkContainerItemGroup>
          <AkContainerItem
            appearance="global"
            icon={<DashboardIcon label="Dashboard" />}
            isSelected
            text="Selected"
            textAfter={<RandomBadge theme="dark" />}
          />
        </AkContainerItemGroup>
        <AkContainerItemGroup>
          <AkContainerItem
            appearance="global"
            icon={<SettingsIcon label="Settings" />}
            text="Item B"
            textAfter={<RandomBadge theme="dark" />}
          />
        </AkContainerItemGroup>
        <AkContainerItemGroup title="one section">
          <AkContainerItem
            appearance="global"
            icon={<TrayIcon label="Tray" />}
            text="Item C"
            textAfter={<RandomBadge theme="dark" />}
          />
        </AkContainerItemGroup>
        <AkContainerItemGroup hasSeparator appearance="global">
          <AkContainerItem
            appearance="global"
            icon={<CalendarIcon label="Calendar" />}
            subText="And a very long second line of text"
            text="A very long first line of text"
            textAfter={<RandomBadge />}
          />
        </AkContainerItemGroup>
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
