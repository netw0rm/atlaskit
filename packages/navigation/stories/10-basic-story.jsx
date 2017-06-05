import { action, storiesOf } from '@kadira/storybook';
import React from 'react';
import { CalendarIcon, DashboardIcon, SettingsIcon, TrayIcon } from '@atlaskit/icon';
import { AtlassianLogo } from '@atlaskit/logo';
import navigationStencil from 'url-loader!./stencils/navigation.svg';
import { AkNavigationItem, AkNavigationItemGroup, AkContainerTitle, presetThemes } from '../src/index';
import NavigationWithDropdown from './components/NavigationWithDropdown';
import HtmlPage from './components/HtmlPage';
import BasicNavigation from './components/BasicNavigation';
import nucleusLogo from './nucleus.png';
import { name } from '../package.json';
import RandomBadge from './components/RandomBadge';
import StickyInlineDialogExample from './components/StickyInlineDialogExample';

const dropdownItemsSample = [
  {
    heading: 'Cities',
    items: [
      { content: 'Sydney', value: 1 },
      { content: 'Canberra', value: 2 },
      { content: 'Melbourne', value: 3 },
      { content: 'Perth', value: 4 },
    ],
  },
];

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
    <HtmlPage>
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
    </HtmlPage>
  ))
  .add('with many container items', () => (
    <HtmlPage>
      <BasicNavigation>
        <AkNavigationItem
          icon={<img alt="icon" src={nucleusLogo} />}
          isSelected
          text="This one is selected"
        />
        {manyNavigationItems()}
      </BasicNavigation>
    </HtmlPage>
  ))
  .add('with a dropdown trigger item', () => (
    <HtmlPage>
      <NavigationWithDropdown
        dropdownProps={{ items: dropdownItemsSample }}
      >
        <AkNavigationItem
          text="Test page 1"
          icon={<DashboardIcon label="Dashboard" secondaryColor="inherit" />}
        />
        <AkNavigationItem
          text="Test page 3"
          icon={<DashboardIcon label="Dashboard" secondaryColor="inherit" />}
        />
        <AkNavigationItem
          text="Test page 4"
          icon={<DashboardIcon label="Dashboard" secondaryColor="inherit" />}
        />
      </NavigationWithDropdown>
    </HtmlPage>
  ))
  .add('with a dropdown trigger item + after text', () => (
    <HtmlPage>
      <NavigationWithDropdown
        dropdownProps={{ items: dropdownItemsSample }}
        navigationItemProps={{ textAfter: 'text', text: 'Menu' }}
      >
        <AkNavigationItem
          text="Test page 1"
          icon={<DashboardIcon label="Dashboard" secondaryColor="inherit" />}
          textAfter="text"
        />
        <AkNavigationItem
          text="Test page 3"
          icon={<DashboardIcon label="Dashboard" secondaryColor="inherit" />}
          textAfter="text"
        />
        <AkNavigationItem
          text="Test page 4"
          icon={<DashboardIcon label="Dashboard" secondaryColor="inherit" />}
          textAfter="text"
        />
      </NavigationWithDropdown>
    </HtmlPage>
  ))
  .add('with a selected item', () => (
    <HtmlPage>
      <BasicNavigation>
        <AkNavigationItem
          icon={<img alt="icon" src={nucleusLogo} />}
          isSelected
          text="Nucleus"
        />
      </BasicNavigation>
    </HtmlPage>
  ))
  .addStencilStory('with a stencil in the open state', () => (
    <HtmlPage>
      <BasicNavigation />
    </HtmlPage>
  ), { image: navigationStencil })
  .add('with multiple groups', () => (
    <HtmlPage>
      <BasicNavigation
        containerTheme={presetThemes.global}
        containerHeaderComponent={AtlassianLogo}
      >
        <AkNavigationItemGroup>
          <AkNavigationItem
            icon={<DashboardIcon label="Dashboard" secondaryColor="inherit" />}
            isSelected
            text="Selected"
            textAfter={<RandomBadge theme="dark" />}
          />
        </AkNavigationItemGroup>
        <AkNavigationItemGroup>
          <AkNavigationItem
            icon={<SettingsIcon label="Settings" secondaryColor="inherit" />}
            text="Item B"
            textAfter={<RandomBadge theme="dark" />}
          />
        </AkNavigationItemGroup>
        <AkNavigationItemGroup title="one section">
          <AkNavigationItem
            icon={<TrayIcon label="Tray" secondaryColor="inherit" />}
            text="Item C"
            textAfter={<RandomBadge theme="dark" />}
          />
        </AkNavigationItemGroup>
        <AkNavigationItemGroup hasSeparator>
          <AkNavigationItem
            icon={<CalendarIcon label="Calendar" secondaryColor="inherit" />}
            subText="And a very long second line of text"
            text="A very long first line of text"
            textAfter={<RandomBadge />}
          />
        </AkNavigationItemGroup>
      </BasicNavigation>
    </HtmlPage>
  ))
  .add('that is not resizeable', () => (
    <HtmlPage>
      <BasicNavigation isResizeable={false} />
    </HtmlPage>
  ))
  .add('with isCollapsible=false', () => (
    <HtmlPage>
      <BasicNavigation isCollapsible={false} />
    </HtmlPage>
  ))
  .add('that starts closed', () => (
    <HtmlPage>
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
    </HtmlPage>
  ))
  .add('with controllable drawers', () => (
    <HtmlPage>
      <BasicNavigation
        onCreateDrawerClose={action('create-close')}
        onCreateDrawerOpen={action('create-open')}
        onSearchDrawerClose={action('search-close')}
        onSearchDrawerOpen={action('search-open')}
      />
    </HtmlPage>
  ))
  .add('with a long ContainerTitle', () => (
    <HtmlPage>
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
    </HtmlPage>
  ))
  .add('with no ContainerTitle subText', () => (
    <HtmlPage>
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
    </HtmlPage>
  ))
  .add('with an InlineDialog in the ContainerHeader', () => (
    <StickyInlineDialogExample />
  ));
