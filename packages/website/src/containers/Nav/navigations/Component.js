/* eslint-disable react/prop-types */

import React from 'react';
import { withRouter } from 'react-router-dom';

import {
  AkNavigationItem as NavItem,
  AkNavigationItemGroup as NavItemGroup,
} from '@atlaskit/navigation';

import ComponentIcon from '@atlaskit/icon/glyph/component';
import MediaServicesZipIcon from '@atlaskit/icon/glyph/media-services/zip';
import PackageIcon from '@atlaskit/icon/glyph/bitbucket/repos';
import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';

import { RouterLinkComponent } from '../linkComponents';
import packages from '../../../data';

const componentKeys = Object.keys(packages);

const ComponentNavItem = withRouter(({ componentKey, location, destination }) => {
  const component = packages[componentKey];
  const url = `${destination}/${componentKey}`;
  // We are matching against endswith so changelogs also show item as selected
  const isSelected = location.pathname.endsWith(`/${componentKey}`);

  return (
    <NavItem
      href={url}
      icon={<PackageIcon size="small" label={`${component.name} icon`} />}
      isSelected={isSelected}
      key={componentKey}
      linkComponent={RouterLinkComponent}
      text={component.name}
    />
  );
});

const NavList = ({ title, filterMethod, destination }) => (
  <NavItemGroup title={title}>
    {componentKeys
      .filter(filterMethod)
      .map(key => (
        <ComponentNavItem
          componentKey={key}
          key={key}
          destination={destination}
        />
    ))}
  </NavItemGroup>
);

const PackagesNav = ({
  pathname,
  filterMethod,
  icon,
  destination,
  title,
  navItemText,
}) => (
  <div style={{ paddingBottom: akGridSizeUnitless * 3 }}>
    <NavItem
      href={destination}
      icon={icon}
      isSelected={pathname === destination}
      linkComponent={RouterLinkComponent}
      text={navItemText}
    />
    <NavList title={title} filterMethod={filterMethod} destination={destination} />
  </div>
);

const ComponentNav = ({ backIcon, router, pathname }) => {
  const componentVariables = {
    filterMethod: k => k,
    icon: <ComponentIcon label="Components icon" />,
    destination: '/components',
    title: 'Components',
    navItemText: 'All components',
  };

  const patternVariables = {
    filterMethod: key => packages[key].isPattern,
    icon: <MediaServicesZipIcon label="Patterns icon" />,
    destination: '/patterns',
    title: 'Patterns',
    navItemText: 'All patterns',
  };
  const variables = pathname.includes('/patterns') ? patternVariables : componentVariables;

  return PackagesNav({ backIcon, router, pathname, ...variables });
};

export default ComponentNav;
