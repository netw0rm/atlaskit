/* eslint-disable react/prop-types */
import React from 'react';

import { AkNavigationItemGroup as NavItemGroup } from '@atlaskit/navigation';

import ComponentIcon from '@atlaskit/icon/glyph/component';
import HomeFilledIcon from '@atlaskit/icon/glyph/home-filled';
import OverviewIcon from '@atlaskit/icon/glyph/overview';
import BitbucketIcon from '@atlaskit/icon/glyph/bitbucket';
import DashboardIcon from '@atlaskit/icon/glyph/dashboard';
import PageIcon from '@atlaskit/icon/glyph/page';

import { RouterNavigationItem, ExternalNavigationItem } from '../linkComponents';

const externalLinks = [
  ['//bitbucket.org/atlassian/atlaskit', 'Repository', BitbucketIcon],
  ['//atlassian.design', 'Design guidelines', DashboardIcon],
];

const DefaultNav = ({ pathname }) => (
  <div>
    <NavItemGroup>
      <RouterNavigationItem
        href="/"
        icon={<HomeFilledIcon label="Welcome icon" />}
        text="Welcome"
        isSelected={pathname === '/'}
      />
    </NavItemGroup>
    <NavItemGroup title="Get Started">
      <RouterNavigationItem
        href="./install"
        icon={<OverviewIcon label="Install icon" />}
        isSelected={pathname === '/install'}
        text="Install guide"
      />
      <RouterNavigationItem
        href="./components"
        icon={<ComponentIcon label="Components icon" />}
        text="Components"
      />
      <ExternalNavigationItem
        href="http://go.atlassian.com/reduced-ui-pack"
        icon={<PageIcon label="More icon" />}
        text="Reduced UI pack"
      />
    </NavItemGroup>
    <NavItemGroup title="Resources">
      {externalLinks.map(([url, title, Icon]) => (
        <ExternalNavigationItem
          href={url}
          icon={<Icon label={title} />}
          isSelected={pathname === url}
          key={url}
          text={title}
        />
      ), this)}
    </NavItemGroup>
  </div>
);

export default DefaultNav;
