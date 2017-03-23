import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { DashboardIcon, SettingsIcon, TrayIcon } from '@atlaskit/icon';

import { AkContainerItem } from '../src/index';
import BasicNavigation from './components/BasicNavigation';
import Page from './components/HtmlPage';
import PagedContainerNavigation from './components/nested-navigation/PagedContainerNavigation';
import { name } from '../package.json';

storiesOf(name, module)
  .add('with nested navigation', () => (
    <Page>
      <BasicNavigation>
        <PagedContainerNavigation />
      </BasicNavigation>
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
            <AkContainerItem icon={<SettingsIcon label="Settings" />} text="Tame Impala – Lonerism" />
          </div>
          <div>
            <AkContainerItem icon={<TrayIcon label="Projects" />} text="The Lord of the Rings" />
            <AkContainerItem icon={<TrayIcon label="Projects" />} text="Marcovaldo" />
            <AkContainerItem icon={<TrayIcon label="Projects" />} text="The Picture of Dorian Gray" />
          </div>
        </PagedContainerNavigation>
      </BasicNavigation>
    </Page>
  )
);
