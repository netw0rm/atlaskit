/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';

import {
  AkNavigationItem,
  AkNavigationItemGroup,
} from '@atlaskit/navigation';

import ComponentIcon from '@atlaskit/icon/glyph/component';
import HomeFilledIcon from '@atlaskit/icon/glyph/home-filled';
import OverviewIcon from '@atlaskit/icon/glyph/overview';
import MediaServicesZipIcon from '@atlaskit/icon/glyph/media-services/zip';
import BitbucketIcon from '@atlaskit/icon/glyph/bitbucket';
import DashboardIcon from '@atlaskit/icon/glyph/dashboard';
import PageIcon from '@atlaskit/icon/glyph/page';

const externalLinks = [
  ['//bitbucket.org/atlassian/atlaskit', 'Repository', BitbucketIcon],
  ['//atlassian.design', 'Design guidelines', DashboardIcon],
];

const DefaultNav = ({ pathname, router, goToNext = () => {} }) => (
  <div>
    <AkNavigationItemGroup>
      <Link to="/">
        <AkNavigationItem
          icon={<HomeFilledIcon label="Welcome icon" />}
          text="Welcome"
          isSelected={pathname === '/'}
        />
      </Link>
    </AkNavigationItemGroup>
    <AkNavigationItemGroup title="Get Started">
      <Link to="./install">
        <AkNavigationItem
          icon={<OverviewIcon label="Install icon" />}
          text="Install guide"
        />
      </Link>
      <AkNavigationItem
        icon={<ComponentIcon label="Components icon" />}
        onClick={() => {
          router.history.push('/components');
          goToNext();
        }}
        text="Components"
      />
      <AkNavigationItem
        icon={<MediaServicesZipIcon label="Pattern icon" />}
        onClick={() => {
          router.history.push('/patterns');
          goToNext();
        }}
        text="Patterns"
      />
      <Link to="http://go.atlassian.com/reduced-ui-pack" target="_new">
        <AkNavigationItem
          icon={<PageIcon label="More icon" />}
          text="Reduced UI pack"
        />
      </Link>
    </AkNavigationItemGroup>
    <AkNavigationItemGroup title="Resources">
      {externalLinks.map(([url, title, Icon]) => (
        <a key={url} href={url} target="_new">
          <AkNavigationItem
            icon={<Icon label={title} />}
            text={title}
            isSelected={pathname === url}
          />
        </a>
      ), this)}
    </AkNavigationItemGroup>
  </div>
);

export default DefaultNav;
