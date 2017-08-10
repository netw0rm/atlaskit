/* eslint-disable react/prop-types */

import React from 'react';

import {
  AkNavigationItem as NavItem,
  AkNavigationItemGroup as NavItemGroup,
} from '@atlaskit/navigation';

import PageFilledIcon from '@atlaskit/icon/glyph/page-filled';
import DetailViewIcon from '@atlaskit/icon/glyph/detail-view';
import PackageIcon from '@atlaskit/icon/glyph/bitbucket/repos';

import { RouterLinkComponent } from '../linkComponents';
import packages from '../../../data';

const NavigationNav = ({ pathname }) => (
  <div>
    <NavItemGroup>
      <NavItem
        href="/components/navigation"
        icon={<PageFilledIcon label="Usage" />}
        linkComponent={RouterLinkComponent}
        text="Usage"
        isSelected={pathname === '/components/navigation'}
      />
      <NavItem
        href="/components/navigation/examples"
        icon={<DetailViewIcon label="Examples" />}
        isSelected={pathname === '/components/navigation/examples'}
        linkComponent={RouterLinkComponent}
        text="Examples"
      />
    </NavItemGroup>
    <NavItemGroup title="components">
      {packages.navigation.props.map(component => (
        <NavItem
          href={`/components/navigation/components/${component.name}`}
          icon={<PackageIcon size="small" label={`${component.name} icon`} />}
          isSelected={pathname === `/components/navigation/components/${component.name}`}
          key={component.name}
          linkComponent={RouterLinkComponent}
          text={component.name}
        />
      ))}
    </NavItemGroup>
  </div>
);

export default NavigationNav;
