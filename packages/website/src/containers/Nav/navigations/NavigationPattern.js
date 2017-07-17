/* eslint-disable react/prop-types */

import React from 'react';
import { Link } from 'react-router-dom';

import {
  AkNavigationItem,
  AkNavigationItemGroup,
} from '@atlaskit/navigation';

import PageFilledIcon from '@atlaskit/icon/glyph/page-filled';
import DetailViewIcon from '@atlaskit/icon/glyph/detail-view';
import PackageIcon from '@atlaskit/icon/glyph/bitbucket/repos';

import packages from '../../../data';

const NavigationNav = ({ pathname, backIcon, router }) => (
  <div>
    <AkNavigationItem
      icon={backIcon}
      onClick={() => router.history.push('/components')}
      text="Back"
    />
    <AkNavigationItemGroup>
      <Link to="/components/navigation">
        <AkNavigationItem
          icon={<PageFilledIcon label="Welcome icon" />}
          text="Usage"
          isSelected={pathname === '/components/navigation'}
        />
      </Link>
      <Link to="/components/navigation/examples">
        <AkNavigationItem
          icon={<DetailViewIcon label="Welcome icon" />}
          text="Examples"
          isSelected={pathname === '/components/navigation/examples'}
        />
      </Link>
    </AkNavigationItemGroup>
    <AkNavigationItemGroup title="components">
      {packages.navigation.props.map(component => (
        <Link to={`/components/navigation/components/${component.name}`} key={component.name}>
          <AkNavigationItem
            icon={<PackageIcon size="small" label={`${component.name} icon`} />}
            text={component.name}
            isSelected={pathname === `/components/navigation/components/${component.name}`}
          />
        </Link>
      ))}
    </AkNavigationItemGroup>
  </div>
);

export default NavigationNav;
