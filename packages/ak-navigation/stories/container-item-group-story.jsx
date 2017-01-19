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
          href="#1"
          icon={<SearchIcon label="Search" />}
          isCompact
          text="Search"
        />
        <AkContainerItemGroup
          action={
            <AkButton
              appearance="subtle"
              iconBefore={<EmojiCustomIcon size="small" />}
              spacing="none"
            />
          }
          title="Rooms"
        >
          <AkContainerItem
            href="#1"
            icon={<HelpIcon label="Help" />}
            isCompact
            text="Help"
          />

          <AkContainerItem
            href="#2"
            icon={<CreateIcon label="Create" />}
            isCompact
            text="Create"
          />
          <AkContainerItem
            href="#3"
            icon={<DashboardIcon label="Dashboard" />}
            isCompact
            text="Nucleus"
          />
        </AkContainerItemGroup>
        <AkContainerItemGroup title="People">
          <AkContainerItem
            href="#4"
            icon={<SettingsIcon label="Settings" />}
            isCompact
            text="Settings"
          />
          <AkContainerItem
            href="#5"
            icon={<ProjectsIcon label="Projects" />}
            isCompact
            text="Projects"
          />
        </AkContainerItemGroup>
      </BasicNavigation>
      <div>
        <Lorem count="30" />
      </div>
    </Page>
  ));
