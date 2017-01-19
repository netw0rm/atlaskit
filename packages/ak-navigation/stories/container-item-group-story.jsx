import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Lorem from 'react-lorem-component';
import { SearchIcon, HelpIcon, CreateIcon, DashboardIcon, SettingsIcon, ProjectsIcon, EmojiCustomIcon } from 'ak-icon';
import AkButton from 'ak-button';
import { name } from '../package.json';
import Page from './components/Page';
import BasicNavigation from './components/BasicNavigation';
import { AkContainerItem, AkContainerItemGroup } from '../src/index';

storiesOf(name, module)
  .add('with a container item group', () => (
    <Page>
      <BasicNavigation>
        <AkContainerItem
          isCompact
          icon={<SearchIcon label="Search" />}
          text="Search"
          href="#1"
        />
        <AkContainerItemGroup
          title="Rooms"
          action={
            <AkButton
              spacing="none"
              iconBefore={<EmojiCustomIcon size="small" />}
              appearance="subtle"
            />
          }
        >
          <AkContainerItem
            isCompact
            icon={<HelpIcon label="Help" />}
            text="Help"
            href="#1"
          />

          <AkContainerItem
            isCompact
            icon={<CreateIcon label="Create" />}
            text="Create"
            href="#2"
          />
          <AkContainerItem
            isCompact
            icon={<DashboardIcon label="Dashboard" />}
            text="Nucleus"
            href="#3"
          />
        </AkContainerItemGroup>
        <AkContainerItemGroup title="People">
          <AkContainerItem
            isCompact
            icon={<SettingsIcon label="Settings" />}
            text="Settings"
            href="#4"
          />
          <AkContainerItem
            isCompact
            icon={<ProjectsIcon label="Projects" />}
            text="Projects"
            href="#5"
          />
        </AkContainerItemGroup>
      </BasicNavigation>
      <div>
        <Lorem count="30" />
      </div>
    </Page>
  ));
