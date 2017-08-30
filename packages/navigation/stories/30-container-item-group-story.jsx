import { storiesOf } from '@kadira/storybook';
import React from 'react';
import SearchIcon from '@atlaskit/icon/glyph/search';
import AddIcon from '@atlaskit/icon/glyph/add';
import DashboardIcon from '@atlaskit/icon/glyph/dashboard';
import SettingsIcon from '@atlaskit/icon/glyph/settings';
import IssuesIcon from '@atlaskit/icon/glyph/issues';
import EmojiCustomIcon from '@atlaskit/icon/glyph/emoji/custom';
import CancelIcon from '@atlaskit/icon/glyph/cross';
import AkButton from '@atlaskit/button';
import Badge from '@atlaskit/badge';
import Lozenge from '@atlaskit/lozenge';
import { name } from '../package.json';
import HtmlPage from './components/HtmlPage';
import BasicNavigation from './components/BasicNavigation';
import { AkNavigationItem, AkNavigationItemGroup } from '../src/index';

storiesOf(name, module)
  .add('with a container item group', () => (
    <HtmlPage>
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
    </HtmlPage>
)).add('container item groups with various actions', () => (
  <HtmlPage>
    <BasicNavigation>
      <AkNavigationItem
        icon={<SearchIcon label="Search" />}
        text="Search"
      />
      <AkNavigationItemGroup title="No action">
        <AkNavigationItem
          icon={<SettingsIcon label="Settings" />}
          text="Settings"
        />
        <AkNavigationItem
          icon={<IssuesIcon label="Issues" />}
          text="Issues"
        />
      </AkNavigationItemGroup>
      <AkNavigationItemGroup
        action={
          <AkButton
            appearance="subtle"
            iconBefore={<EmojiCustomIcon label="add" size="medium" />}
            spacing="none"
          />
        }
        title="Button, also I have a long title"
      >
        <AkNavigationItem
          icon={<SettingsIcon label="Settings" />}
          text="Settings"
          action={<CancelIcon label="Cancel" size="small" />}
        />
        <AkNavigationItem
          icon={<IssuesIcon label="Issues" />}
          text="Issues"
          action={<CancelIcon label="Cancel" size="small" />}
        />
      </AkNavigationItemGroup>
      <AkNavigationItemGroup
        action={<Badge appearance="primary" value={5} />}
        title="Badge"
      >
        <AkNavigationItem
          icon={<SettingsIcon label="Settings" />}
          text="Settings"
          action={<CancelIcon label="Cancel" size="small" />}
        />
        <AkNavigationItem
          icon={<IssuesIcon label="Issues" />}
          text="Issues"
          action={<CancelIcon label="Cancel" size="small" />}
        />
      </AkNavigationItemGroup>
      <AkNavigationItemGroup
        action={<Lozenge appearance="success" isBold>New</Lozenge>}
        title="Lozenge"
      >
        <AkNavigationItem
          icon={<SettingsIcon label="Settings" />}
          text="Settings"
          action={<CancelIcon label="Cancel" size="small" />}
        />
        <AkNavigationItem
          icon={<IssuesIcon label="Issues" />}
          text="Issues"
          action={<CancelIcon label="Cancel" size="small" />}
        />
      </AkNavigationItemGroup>
      <AkNavigationItemGroup
        action="hello :)"
        title="Arbitrary text"
      >
        <AkNavigationItem
          icon={<SettingsIcon label="Settings" />}
          text="Settings"
          action={<CancelIcon label="Cancel" size="small" />}
        />
        <AkNavigationItem
          icon={<IssuesIcon label="Issues" />}
          text="Issues"
          action={<CancelIcon label="Cancel" size="small" />}
        />
      </AkNavigationItemGroup>
      <AkNavigationItemGroup
        action={
          <AkButton
            appearance="subtle"
            iconBefore={<EmojiCustomIcon label="add" size="medium" />}
            spacing="none"
          />
        }
        isCompact
        title="Compact group and items"
      >
        <AkNavigationItem
          icon={<SettingsIcon label="Settings" />}
          isCompact
          text="Settings"
          action={<CancelIcon label="Cancel" size="small" />}
        />
        <AkNavigationItem
          icon={<IssuesIcon label="Issues" />}
          isCompact
          text="Issues"
          action={<CancelIcon label="Cancel" size="small" />}
        />
      </AkNavigationItemGroup>
    </BasicNavigation>
  </HtmlPage>
));
