import React from 'react';
import SearchIcon from '@atlaskit/icon/glyph/search';
import AddIcon from '@atlaskit/icon/glyph/add';
import DashboardIcon from '@atlaskit/icon/glyph/dashboard';
import SettingsIcon from '@atlaskit/icon/glyph/settings';
import IssuesIcon from '@atlaskit/icon/glyph/issues';
import EmojiCustomIcon from '@atlaskit/icon/glyph/emoji/custom';
import AkButton from '@atlaskit/button';
import BasicNavigation from '../stories/components/BasicNavigation';
import { AkNavigationItem, AkNavigationItemGroup } from '../src/index';

export default () => (
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
          iconBefore={<EmojiCustomIcon label="add" size="medium" />}
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
);
