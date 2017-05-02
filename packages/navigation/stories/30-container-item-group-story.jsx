import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { SearchIcon, AddIcon, DashboardIcon, SettingsIcon, IssuesIcon, EmojiCustomIcon } from '@atlaskit/icon';
import AkButton from '@atlaskit/button';
import { name } from '../package.json';
import Page from './components/HtmlPage';
import BasicNavigation from './components/BasicNavigation';
import { AkNavigationItem, AkNavigationItemGroup } from '../src/index';

storiesOf(name, module)
  .add('with a container item group', () => (
    <Page>
      <BasicNavigation>
        <AkNavigationItem
          icon={<SearchIcon label="Search" />}
          isCompact
          text="Search"
        />
        <AkNavigationItemGroup
          action={
            <AkButton
              appearance="subtle"
              iconBefore={<EmojiCustomIcon label="add" size="small" />}
              spacing="none"
            />
          }
          title="Rooms"
        >
          <AkNavigationItem
            icon={<IssuesIcon label="Issues" />}
            isCompact
            text="Issues"
          />
          <AkNavigationItem
            icon={<AddIcon label="Create" />}
            isCompact
            text="Create"
          />
          <AkNavigationItem
            icon={<DashboardIcon label="Dashboard" />}
            isCompact
            text="Nucleus"
          />
        </AkNavigationItemGroup>
        <AkNavigationItemGroup title="People">
          <AkNavigationItem
            icon={<SettingsIcon label="Settings" />}
            isCompact
            text="Settings"
          />
          <AkNavigationItem
            icon={<IssuesIcon label="Issues" />}
            isCompact
            text="Issues"
          />
        </AkNavigationItemGroup>
      </BasicNavigation>
    </Page>
  ));
