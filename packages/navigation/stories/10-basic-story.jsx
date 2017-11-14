import { action, storiesOf } from '@kadira/storybook';
import React from 'react';
import CalendarIcon from '@atlaskit/icon/glyph/calendar';
import DashboardIcon from '@atlaskit/icon/glyph/dashboard';
import SettingsIcon from '@atlaskit/icon/glyph/settings';
import TrayIcon from '@atlaskit/icon/glyph/tray';
import { AtlassianWordmark } from '@atlaskit/logo';
import DropdownMenu, { DropdownItemGroup, DropdownItem } from '@atlaskit/dropdown-menu';
import { AkNavigationItem, AkNavigationItemGroup, AkContainerLogo, AkContainerTitle, presetThemes } from '../src/index';
import NavigationWithDropdown from './components/NavigationWithDropdown';
import HtmlPage from './components/HtmlPage';
import BasicNavigation from './components/BasicNavigation';
import { name } from '../package.json';
import randomBadge from './components/RandomBadge';
import NucleusIcon from './components/NucleusIcon';
import ContainerRefScrollExample from './examples/ContainerRefScrollExample';
import ToggleCallbackNavigation from './examples/ToggleCallbackNavigation';
import Avatar from '@atlaskit/avatar';

const dropdownItemsSample = (
  <DropdownItemGroup title="Cities">
    <DropdownItem>Sydney</DropdownItem>
    <DropdownItem>Canberra</DropdownItem>
    <DropdownItem>Melbourne</DropdownItem>
    <DropdownItem>Perth</DropdownItem>
  </DropdownItemGroup>
);

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
      <BasicNavigation containerTheme={presetThemes.container} hasScrollHintTop>
        <AkNavigationItem
          text="Test page"
          href="#1"
        />
        <AkNavigationItem
          icon={<NucleusIcon />}
          text="Item with an icon"
          href="#2"
        />
        <AkNavigationItem
          icon={<NucleusIcon />}
          text="Item with two lines"
          subText="Another line of text, which could possibly be long"
          href="#3"
        />
        <AkNavigationItem
          icon={<NucleusIcon />}
          text="A really, really, quite long, actually super long container name"
          href="#4"
        />
        <AkNavigationItem
          icon={<NucleusIcon />}
          text="A really, really, quite long, actually super long container name with action"
          subText="Another line of text, which could possibly be long"
          action={<span>text</span>}
          href="#5"
        />
      </BasicNavigation>
    </HtmlPage>
  ))
  .add('with many container items', () => (
    <HtmlPage>
      <BasicNavigation hasScrollHintTop>
        <AkNavigationItem
          icon={<NucleusIcon />}
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
        dropdownItems={dropdownItemsSample}
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
        dropdownItems={dropdownItemsSample}
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
          href="#"
          text="Test page"
        />
        <AkNavigationItem
          icon={<NucleusIcon />}
          isSelected
          text="Nucleus"
        />
      </BasicNavigation>
    </HtmlPage>
  ))
  .add('with a dropdown', () => (
    <HtmlPage>
      <BasicNavigation>
        <AkNavigationItem
          href="#"
          text="Item one"
        />
        <AkNavigationItem
          icon={<NucleusIcon />}
          text="Item two"
        />
        <DropdownMenu
          shouldFitContainer
          triggerType="button"
          trigger="Test"
        >
          <AkNavigationItem
            icon={<NucleusIcon />}
            text="Item three"
          />
        </DropdownMenu>
      </BasicNavigation>
    </HtmlPage>
  ))
  .add('with multiple groups', () => (
    <HtmlPage>
      <BasicNavigation
        containerTheme={presetThemes.global}
        containerHeaderComponent={() => (<AkContainerLogo><AtlassianWordmark /></AkContainerLogo>)}
        hasScrollHintTop
      >
        <AkNavigationItemGroup>
          <AkNavigationItem
            icon={<DashboardIcon label="Dashboard" secondaryColor="inherit" />}
            isSelected
            text="Selected"
            textAfter={randomBadge('dark')}
          />
        </AkNavigationItemGroup>
        <AkNavigationItemGroup>
          <AkNavigationItem
            icon={<SettingsIcon label="Settings" secondaryColor="inherit" />}
            text="Item B"
            textAfter={randomBadge('dark')}
          />
        </AkNavigationItemGroup>
        <AkNavigationItemGroup title="one section">
          <AkNavigationItem
            icon={<TrayIcon label="Tray" secondaryColor="inherit" />}
            text="Item C"
            textAfter={randomBadge('dark')}
          />
        </AkNavigationItemGroup>
        <AkNavigationItemGroup hasSeparator>
          <AkNavigationItem
            icon={<CalendarIcon label="Calendar" secondaryColor="inherit" />}
            subText="And a very long second line of text"
            text="A very long first line of text"
            textAfter={randomBadge('dark')}
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
  .add('with onToggle callbacks', () => (
    <ToggleCallbackNavigation />
  ))
  .add('that starts closed', () => (
    <HtmlPage>
      <BasicNavigation isOpen={false}>
        <AkNavigationItem
          icion={<NucleusIcon />}
          isSelected
          text="This one is selected"
        />
        <AkNavigationItem
          icion={<NucleusIcon />}
          text="This one is not selected"
        />
      </BasicNavigation>
    </HtmlPage>
  ))
  .add('that starts closed with search/create, and lots of items', () => (
    <HtmlPage>
      <BasicNavigation isOpen={false}>
        {manyNavigationItems()}
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
            icon={<NucleusIcon />}
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
            icon={<NucleusIcon />}
            text="AtlasKit"
          />
        )}
      />
    </HtmlPage>
  ))
  .add('with horizontal scrollable container', () => (
    <HtmlPage>
      <BasicNavigation
        containerHeaderComponent={() => (
          <div>Header Component</div>
        )}
      >
        <div style={{ overflowX: 'auto', width: 'auto', display: 'flex', flexGrow: 1, flexDirection: 'column' }}>
          <h6 style={{ whiteSpace: 'nowrap' }}>this is something super long that would cause the scroll to appear</h6>
          <ul>
            <li style={{ whiteSpace: 'nowrap' }}>The matrix</li>
            <li style={{ whiteSpace: 'nowrap' }}>The Beatles – Sgt. Peppers Lonely Hearts Club Band</li>
            <li style={{ whiteSpace: 'nowrap' }}>Tame Impala – Lonerism</li>
            <li style={{ whiteSpace: 'nowrap' }}>The Beatles – Sgt. Peppers Lonely Hearts Club Band</li>
            <li style={{ whiteSpace: 'nowrap' }}>Tame Impala – Lonerism</li>
            <li style={{ whiteSpace: 'nowrap' }}>The Beatles – Sgt. Peppers Lonely Hearts Club Band</li>
            <li style={{ whiteSpace: 'nowrap' }}>Tame Impala – Lonerism</li>
          </ul>
        </div>
      </BasicNavigation>
    </HtmlPage>
  ))
  .add('using containerScrollRef', () => (
    <HtmlPage>
      <ContainerRefScrollExample>
        {manyNavigationItems()}
      </ContainerRefScrollExample>
    </HtmlPage>
  ))
  .add('with a square primary nav icon', () => (
    <HtmlPage>
      <BasicNavigation
        containerTheme={presetThemes.container}
        hasScrollHintTop
        globalPrimaryIcon={
          <Avatar
            appearance="square"
            name="Primary Icon"
            enableTooltip={false}
          />
        }
        globalPrimaryIconAppearance="square"
      >
        <AkNavigationItem
          text="Test page"
          href="#1"
        />
        <AkNavigationItem
          icon={<NucleusIcon />}
          text="Item with an icon"
          href="#2"
        />
        <AkNavigationItem
          icon={<NucleusIcon />}
          text="Item with two lines"
          subText="Another line of text, which could possibly be long"
          href="#3"
        />
        <AkNavigationItem
          icon={<NucleusIcon />}
          text="A really, really, quite long, actually super long container name"
          href="#4"
        />
        <AkNavigationItem
          icon={<NucleusIcon />}
          text="A really, really, quite long, actually super long container name with action"
          subText="Another line of text, which could possibly be long"
          action={<span>text</span>}
          href="#5"
        />
      </BasicNavigation>
    </HtmlPage>
  ))
  .add('with position: relative on elements beneath blanket', () => (
    <div>
      <BasicNavigation containerTheme={presetThemes.container} hasScrollHintTop>
        <AkNavigationItem
          text="Test page"
          href="#1"
        />
        <AkNavigationItem
          icon={<NucleusIcon />}
          text="Item with an icon"
          href="#2"
        />
      </BasicNavigation>
      <p>
        <div
          style={{
            backgroundColor: 'red',
            height: 200,
            textAlign: 'right',
          }}
        >
          Is beneath the blanket
      </div>
        <div
          style={{
            backgroundColor: 'red',
            position: 'relative',
            height: 200,
            textAlign: 'right',
          }}
        >
          Should be beneath the blanket
    </div>
      </p>
    </div>
  ));
