/* eslint-disable react/prop-types */
import React from 'react';

import {
  AkNavigationItem as NavItem,
  AkNavigationItemGroup as NavItemGroup,
} from '@atlaskit/navigation';

import ComponentIcon from '@atlaskit/icon/glyph/component';
import HomeFilledIcon from '@atlaskit/icon/glyph/home-filled';
import OverviewIcon from '@atlaskit/icon/glyph/overview';
import BitbucketIcon from '@atlaskit/icon/glyph/bitbucket';
import DashboardIcon from '@atlaskit/icon/glyph/dashboard';
import PageIcon from '@atlaskit/icon/glyph/page';

import { RouterLinkComponent, ExternalLinkComponent } from '../linkComponents';

const externalLinks = [
  ['//bitbucket.org/atlassian/atlaskit', 'Repository', BitbucketIcon],
  ['//atlassian.design', 'Design guidelines', DashboardIcon],
];

const DefaultNav = ({ pathname }) => (
  <div>
    <NavItemGroup>
      <NavItem
        href="/"
        icon={<HomeFilledIcon label="Welcome icon" />}
        linkComponent={RouterLinkComponent}
        text="Welcome"
        isSelected={pathname === '/'}
      />
    </NavItemGroup>
    <NavItemGroup title="Get Started">
      <NavItem
        href="./install"
        icon={<OverviewIcon label="Install icon" />}
        isSelected={pathname === '/install'}
        linkComponent={RouterLinkComponent}
        text="Install guide"
      />
      <NavItem
        href="./components"
        icon={<ComponentIcon label="Components icon" />}
        linkComponent={RouterLinkComponent}
        text="Components"
      />
      <NavItem
        href="http://go.atlassian.com/reduced-ui-pack"
        icon={<PageIcon label="More icon" />}
        linkComponent={ExternalLinkComponent}
        text="Reduced UI pack"
      />
    </NavItemGroup>
    <NavItemGroup title="Resources">
      {externalLinks.map(([url, title, Icon]) => (
        <NavItem
          href={url}
          icon={<Icon label={title} />}
          isSelected={pathname === url}
          key={url}
          linkComponent={ExternalLinkComponent}
          text={title}
        />
      ), this)}
    </NavItemGroup>
  </div>
);

export default DefaultNav;
