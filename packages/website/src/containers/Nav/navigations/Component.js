/* eslint-disable react/prop-types */

import React from 'react';
import { withRouter } from 'react-router-dom';

import { AkNavigationItemGroup as NavItemGroup } from '@atlaskit/navigation';

import ComponentIcon from '@atlaskit/icon/glyph/component';
import MediaServicesZipIcon from '@atlaskit/icon/glyph/media-services/zip';
import PackageIcon from '@atlaskit/icon/glyph/bitbucket/repos';
import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';

import { RouterNavigationItem, ExternalNavigationItem } from '../linkComponents';
import packages from '../../../data';
import { NEW_WEBSITE_LOCATION } from '../../../../constants';

const componentKeys = Object.keys(packages);

const BatmanIcon = () => (
  process.env.ATLASKIT_SITE_ENV !== 'production' ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1"
      viewBox="0 0 26 26"
      fill="currentColor"
      width="26"
      height="26"
    >
      <path d="M 13 5 C 5.8 5 0 8.6 0 13 C 0 17.4 5.8 21 13 21 C 20.2 21 26 17.4 26 13 C 26 8.6 20.2 5 13 5 z M 13 5.90625 C 19.7 5.90625 25.09375 9.1 25.09375 13 C 25.09375 16.9 19.7 20.09375 13 20.09375 C 6.3 20.09375 0.90625 16.9 0.90625 13 C 0.90625 9.1 6.3 5.90625 13 5.90625 z M 8.90625 7 C 4.90625 7.9 2 10.20625 2 12.90625 C 2 13.70625 2.1875 14.40625 2.6875 14.90625 C 3.2875 15.80625 4.20625 16.6125 5.40625 17.3125 L 6.59375 17.90625 C 4.39375 14.90625 7.99375 13.99375 9.59375 17.09375 C 10.29375 14.69375 12.39375 15.8 13.09375 19 C 13.69375 15.9 15.9 14.6875 16.5 17.1875 C 18.1 14.0875 21.59375 15.00625 19.59375 17.90625 C 22.19375 16.80625 23.90625 14.90625 23.90625 12.90625 C 23.90625 10.20625 21.1 7.9 17 7 C 20 11 15.70625 13.8125 14.90625 10.3125 L 14.59375 7 L 13.8125 7.90625 L 13 7.90625 L 12.1875 7.90625 L 11.5 7 L 11.1875 10.3125 C 10.3875 13.9125 5.99375 11 9.09375 7 L 8.90625 7 z" />
    </svg>
  ) : (
    null
  )
);

const ComponentNavItem = withRouter(
  ({ componentKey, location, destination }) => {
    const {
      packageHasBeenMoved,
      name,
      supportsDarkMode,
    } = packages[componentKey];
    const url = packageHasBeenMoved
      ? `${NEW_WEBSITE_LOCATION}/packages/elements/${componentKey}`
      : `${destination}/${componentKey}`;
    // We are matching against endswith so changelogs also show item as selected
    const isSelected = location.pathname.endsWith(`/${componentKey}`);
    const LinkComponent = packageHasBeenMoved
      ? ExternalNavigationItem
      : RouterNavigationItem;
    return (
      <LinkComponent
        href={url}
        icon={
          supportsDarkMode && process.env.ATLASKIT_SITE_ENV !== 'production'
            ? <BatmanIcon />
            : <PackageIcon size="small" label={`${name} icon`} />
        }
        isSelected={isSelected}
        key={componentKey}
        text={name}
      />
    );
  }
);

const NavList = ({ title, filterMethod, destination }) =>
  <NavItemGroup title={title}>
    {componentKeys
      .filter(filterMethod)
      .map(key =>
        <ComponentNavItem
          componentKey={key}
          key={key}
          destination={destination}
        />
      )}
  </NavItemGroup>;

const PackagesNav = ({
  pathname,
  filterMethod,
  icon,
  destination,
  title,
  navItemText,
}) =>
  <div style={{ paddingBottom: akGridSizeUnitless * 3 }}>
    <RouterNavigationItem
      href={destination}
      icon={icon}
      isSelected={pathname === destination}
      text={navItemText}
    />
    <NavList
      title={title}
      filterMethod={filterMethod}
      destination={destination}
    />
  </div>;

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
  const variables = pathname.includes('/patterns')
    ? patternVariables
    : componentVariables;

  return PackagesNav({ backIcon, router, pathname, ...variables });
};

export default ComponentNav;
