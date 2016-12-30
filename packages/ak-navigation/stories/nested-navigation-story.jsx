import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Lorem from 'react-lorem-component';
import { DashboardIcon, SettingsIcon, ProjectsIcon } from 'ak-icon';

import { AkContainerItem } from '../src/index';
import BasicNavigation from './components/BasicNavigation';
import Page from './components/Page';
import PagedContainerNavigation from './components/nested-navigation/PagedContainerNavigation';
import { name } from '../package.json';

storiesOf(name, module)
  .add('with nested navigation', () => (
    <Page>
      <BasicNavigation>
        <PagedContainerNavigation />
      </BasicNavigation>
      <div>
        <Lorem count="30" />
      </div>
    </Page>
  ))
  .add('with nested navigation and container items', () => (
    <Page>
      <BasicNavigation>
        <PagedContainerNavigation>
          <div>
            <AkContainerItem icon={<DashboardIcon label="Dashboard" />} text="The matrix" />
            <AkContainerItem icon={<DashboardIcon label="Dashboard" />} text="Lord of the rings" />
            <AkContainerItem icon={<DashboardIcon label="Dashboard" />} text="Inception" />
          </div>
          <div>
            <AkContainerItem icon={<SettingsIcon label="Settings" />} text="The xx – coexist" />
            <AkContainerItem icon={<SettingsIcon label="Settings" />} text="Alt J – an awesome wave" />
            <AkContainerItem icon={<SettingsIcon label="Settings" />} text="The Beatles – Sgt. Peppers Lonely Hearts Club Band" />
          </div>
          <div>
            <AkContainerItem icon={<ProjectsIcon label="Projects" />} text="The Lord of the Rings" />
            <AkContainerItem icon={<ProjectsIcon label="Projects" />} text="Marcovaldo" />
            <AkContainerItem icon={<ProjectsIcon label="Projects" />} text="The Picture of Dorian Gray" />
          </div>
        </PagedContainerNavigation>
      </BasicNavigation>
      <div>
        <Lorem count="30" />
      </div>
    </Page>
  )
);
