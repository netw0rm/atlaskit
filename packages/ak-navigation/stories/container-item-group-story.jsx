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
        <a href="#1">
          <AkContainerItem
            icon={<SearchIcon label="Search" />}
            isCompact
            text="Search"
          />
        </a>
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
          <a href="#1">
            <AkContainerItem
              icon={<HelpIcon label="Help" />}
              isCompact
              text="Help"
            />
          </a>
          <a href="#2">
            <AkContainerItem
              icon={<CreateIcon label="Create" />}
              isCompact
              text="Create"
            />
          </a>
          <a href="#3">
            <AkContainerItem
              icon={<DashboardIcon label="Dashboard" />}
              isCompact
              text="Nucleus"
            />
          </a>
        </AkContainerItemGroup>
        <AkContainerItemGroup title="People">
          <a href="#4">
            <AkContainerItem
              icon={<SettingsIcon label="Settings" />}
              isCompact
              text="Settings"
            />
          </a>
          <a href="#5">
            <AkContainerItem
              icon={<ProjectsIcon label="Projects" />}
              isCompact
              text="Projects"
            />
          </a>
        </AkContainerItemGroup>
      </BasicNavigation>
      <div>
        <Lorem count="30" />
      </div>
    </Page>
  ));
