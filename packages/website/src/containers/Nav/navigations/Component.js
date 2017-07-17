/* eslint-disable react/prop-types */

import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import {
  AkNavigationItem,
  AkNavigationItemGroup,
} from '@atlaskit/navigation';

import ComponentIcon from '@atlaskit/icon/glyph/component';
import PackageIcon from '@atlaskit/icon/glyph/bitbucket/repos';
import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';

import packages from '../../../data';
import PatternNav from './PatternNav';

const componentKeys = Object.keys(packages);

const ComponentAkNavigationItem = withRouter(({ componentKey, location, destination }) => {
  const component = packages[componentKey];
  const url = `${destination}/${componentKey}`;
  const isSelected = location.pathname === url;

  return (
    <Link to={url} key={componentKey}>
      <AkNavigationItem
        icon={<PackageIcon size="small" label={`${component.name} icon`} />}
        text={component.name}
        isSelected={isSelected}
      />
    </Link>
  );
});

const NavList = ({ title, destination }) => (
  <AkNavigationItemGroup title={title}>
    {componentKeys
      .map(key => (
        <ComponentAkNavigationItem
          componentKey={key}
          key={key}
          destination={destination}
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
  const componentVariables = {
    icon: <ComponentIcon label="Components icon" />,
    destination: '/components',
    title: 'Components',
    navItemText: 'All components',
  };

  const variables = componentVariables;

  if (pathname.includes('/patterns')) {
    return (
      <PatternNav
        backIcon={backIcon}
        router={router}
        pathname={pathname}
      />
    );
  }
  return PackagesNav({ backIcon, router, pathname, ...variables });
};

export default ComponentNav;
