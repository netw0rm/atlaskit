import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { SearchIcon, AddIcon, DashboardIcon, SettingsIcon, IssuesIcon, EmojiCustomIcon } from '@atlaskit/icon';
import AkButton from '@atlaskit/button';
import { name } from '../package.json';
import Page from './components/HtmlPage';
import BasicNavigation from './components/BasicNavigation';
import { AkContainerItem, AkContainerItemGroup } from '../src/index';

storiesOf(name, module)
  .add('with a container item group', () => (
    <Page>
      <BasicNavigation>
        <AkContainerItem
          icon={<SearchIcon label="Search" />}
          isCompact
          text="Search"
        />
        <AkContainerItemGroup
          action={
            <AkButton
              appearance="subtle"
              iconBefore={<EmojiCustomIcon label="add" size="small" />}
              spacing="none"
            />
          }
          title="Rooms"
        >
          <AkContainerItem
            icon={<IssuesIcon label="Issues" />}
            isCompact
            text="Issues"
          />
          <AkContainerItem
            icon={<AddIcon label="Create" />}
            isCompact
            text="Create"
          />
          <AkContainerItem
            icon={<DashboardIcon label="Dashboard" />}
            isCompact
            text="Nucleus"
          />
        </AkContainerItemGroup>
        <AkContainerItemGroup title="People">
          <AkContainerItem
            icon={<SettingsIcon label="Settings" />}
            isCompact
            text="Settings"
          />
          <AkContainerItem
            icon={<IssuesIcon label="Issues" />}
            isCompact
            text="Issues"
          />
        </AkContainerItemGroup>
      </BasicNavigation>
    </Page>
  ));
