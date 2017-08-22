/* eslint-disable react/prop-types */

import React from 'react';

import { AkNavigationItemGroup as NavItemGroup } from '@atlaskit/navigation';

import PageFilledIcon from '@atlaskit/icon/glyph/page-filled';
import DetailViewIcon from '@atlaskit/icon/glyph/detail-view';
import PackageIcon from '@atlaskit/icon/glyph/bitbucket/repos';

import { RouterNavigationItem } from '../linkComponents';
import packages from '../../../data';

const NavigationNav = ({ pathname }) => (
  <div>
    <NavItemGroup>
      <RouterNavigationItem
        href="/components/navigation"
        icon={<PageFilledIcon label="Usage" />}
        text="Usage"
        isSelected={pathname === '/components/navigation'}
      />
      <RouterNavigationItem
        href="/components/navigation/examples"
        icon={<DetailViewIcon label="Examples" />}
        isSelected={pathname === '/components/navigation/examples'}
        text="Examples"
      />
    </NavItemGroup>
    <NavItemGroup title="components">
      {packages.navigation.props.map(component => (
        <RouterNavigationItem
          href={`/components/navigation/components/${component.name}`}
          icon={<PackageIcon size="small" label={`${component.name} icon`} />}
          isSelected={pathname === `/components/navigation/components/${component.name}`}
          key={component.name}
          text={component.name}
        />
      ))}
    </NavItemGroup>
  </div>
);

export default NavigationNav;
