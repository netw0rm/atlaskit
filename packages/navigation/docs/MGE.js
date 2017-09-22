import React from 'react';
import DashboardIcon from '@atlaskit/icon/glyph/dashboard';
import SettingsIcon from '@atlaskit/icon/glyph/settings';
import TrayIcon from '@atlaskit/icon/glyph/tray';
import { AtlassianLogo } from '@atlaskit/logo';
import { AkNavigationItem, AkNavigationItemGroup, AkContainerLogo, presetThemes } from '../src/index';
// import HtmlPage from './components/HtmlPage';
import BasicNavigation from '../stories/components/BasicNavigation';
// import randomBadge from '../stories/components/RandomBadge';
// import Badge from '@atlaskit/badge';

export default () => (
  <BasicNavigation
    containerTheme={presetThemes.dark2}
    globalTheme={presetThemes.dark2}
    containerHeaderComponent={() => (<AkContainerLogo><AtlassianLogo /></AkContainerLogo>)}
    hasScrollHintBottom
    hasScrollHintTop
  >
    <AkNavigationItemGroup>
      <AkNavigationItem
        icon={<DashboardIcon label="Dashboard" secondaryColor="inherit" />}
        isSelected
        text="Selected"
        // textAfter={randomBadge('dark')}
        // textAfter={
        //   <Badge
        //     appearance="primary"
        //     value={15}
        //   />
        // }
      />
    </AkNavigationItemGroup>
    <AkNavigationItemGroup>
      <AkNavigationItem
        icon={<SettingsIcon label="Settings" secondaryColor="inherit" />}
        text="Item B"
        // textAfter={randomBadge('dark')}
      />
      <AkNavigationItem
        icon={<TrayIcon label="Tray" secondaryColor="inherit" />}
        text="Item C"
        // textAfter={randomBadge('dark')}
      />
    </AkNavigationItemGroup>
  </BasicNavigation>
);
