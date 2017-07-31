/* eslint-disable react/prop-types */

import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import {
  AkNavigationItem,
  AkNavigationItemGroup,
} from '@atlaskit/navigation';

import MediaServicesZipIcon from '@atlaskit/icon/glyph/media-services/zip';
import PackageIcon from '@atlaskit/icon/glyph/bitbucket/repos';
import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';

import patterns from '../../../patterns.data';

const ComponentAkNavigationItem = withRouter(({ pattern, location }) => {
  const url = `/patterns/${encodeURI(pattern.title)}`;
  const isSelected = location.pathname === url;

  return (
    <Link to={url} key={pattern.title}>
      <AkNavigationItem
        icon={<PackageIcon size="small" label={`${pattern.title} icon`} />}
        text={pattern.title}
        isSelected={isSelected}
      />
    </Link>
  );
});

const NavList = ({ title }) => (
  <AkNavigationItemGroup title={title}>
    {patterns
      .map(pattern => (
        <ComponentAkNavigationItem
          pattern={pattern}
          key={pattern.title}
        />
    ))}
  </AkNavigationItemGroup>
);

const PackagesNav = ({
  backIcon,
  router,
  pathname,
  icon,
  destination,
  title,
  navItemText,
}) => (
  <div style={{ paddingBottom: akGridSizeUnitless * 3 }}>
    <AkNavigationItem
      icon={backIcon}
      onClick={() => router.history.push('/')}
      text="Back"
    />
    <AkNavigationItem
      icon={icon}
      onClick={() => router.history.push(destination)}
      text={navItemText}
      isSelected={pathname === destination}
    />
    <NavList title={title} destination={destination} />
  </div>
);

const ComponentNav = ({ backIcon, router, pathname }) => {
  const patternVariables = {
    icon: <MediaServicesZipIcon label="Patterns icon" />,
    destination: '/patterns',
    title: 'Patterns',
    navItemText: 'All patterns',

  };
  const variables = patternVariables;

  return PackagesNav({ backIcon, router, pathname, ...variables });
};

export default ComponentNav;
