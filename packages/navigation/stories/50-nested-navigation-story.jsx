import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Tooltip from '@atlaskit/tooltip';
import { DashboardIcon, SettingsIcon, TrayIcon } from '@atlaskit/icon';

import { AkNavigationItem } from '../src/index';
import BasicNavigation from './components/BasicNavigation';
import HtmlPage from './components/HtmlPage';
import PagedContainerNavigation from './components/nested-navigation/PagedContainerNavigation';
import { name } from '../package.json';

storiesOf(name, module)
  .add('with nested navigation', () => (
    <HtmlPage>
      <BasicNavigation>
        <PagedContainerNavigation />
      </BasicNavigation>
    </HtmlPage>
  ))
  .add('with nested navigation and container items', () => (
    <HtmlPage>
      <BasicNavigation>
        <PagedContainerNavigation>
          <div>
            <Tooltip position="right" description="The matrix"><AkNavigationItem icon={<DashboardIcon label="Dashboard" />} text="The matrix" /></Tooltip>
            <Tooltip position="right" description="Lord of the rings"><AkNavigationItem icon={<DashboardIcon label="Dashboard" />} text="Lord of the rings" /></Tooltip>
            <Tooltip position="right" description="Inception"><AkNavigationItem icon={<DashboardIcon label="Dashboard" />} text="Inception" /></Tooltip>
          </div>
          <div>
            <Tooltip position="right" description="The xx – coexist"><AkNavigationItem icon={<SettingsIcon label="Settings" />} text="The xx – coexist" /></Tooltip>
            <Tooltip position="right" description="Alt J – an awesome wave"><AkNavigationItem icon={<SettingsIcon label="Settings" />} text="Alt J – an awesome wave" /></Tooltip>
            <Tooltip position="right" description="The Beatles – Sgt. Peppers Lonely Hearts Club Band"><AkNavigationItem icon={<SettingsIcon label="Settings" />} text="The Beatles – Sgt. Peppers Lonely Hearts Club Band" /></Tooltip>
            <Tooltip position="right" description="Tame Impala – Lonerism"><AkNavigationItem icon={<SettingsIcon label="Settings" />} text="Tame Impala – Lonerism" /></Tooltip>
          </div>
          <div>
            <Tooltip position="right" description="The Lord of the Rings"><AkNavigationItem icon={<TrayIcon label="Projects" />} text="The Lord of the Rings" /></Tooltip>
            <Tooltip position="right" description="Marcovaldo"><AkNavigationItem icon={<TrayIcon label="Projects" />} text="Marcovaldo" /></Tooltip>
            <Tooltip position="right" description="The Picture of Dorian Gray"><AkNavigationItem icon={<TrayIcon label="Projects" />} text="The Picture of Dorian Gray" /></Tooltip>
          </div>
        </PagedContainerNavigation>
      </BasicNavigation>
    </HtmlPage>
  )
);
