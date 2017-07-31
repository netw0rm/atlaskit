/* eslint-disable react/prop-types */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Route, Switch } from 'react-router-dom';

import Navigation, {
  AkContainerTitle as NavTitle,
  AkSearchDrawer,
  AkContainerNavigationNested,
} from '@atlaskit/navigation';

import ArrowLeft from '@atlaskit/icon/glyph/arrow-left';
import AtlassianIcon from '@atlaskit/icon/glyph/atlassian';
import SearchIcon from '@atlaskit/icon/glyph/search';

import atlasKitLogo from '../../images/atlaskit-logo.png';
import SearchDrawer from './SearchDrawer';

import PatternNav from './navigations/PatternNav';
import DefaultNav from './navigations/Default';
import ComponentNav from './navigations/Component';
import patterns from '../../../patterns.data';

const backIcon = <ArrowLeft label="Back icon" />;

const Header = () => (
  <Link to="/">
    <NavTitle
      icon={<img alt="AtlasKit Logo" src={atlasKitLogo} />}
      text="AtlasKit"
    />
  </Link>
);

const getCurrentStack = (pathname: string, router): Array<Element> => {
  let currentStack = [<DefaultNav
    pathname={pathname}
    router={router}
  />];
  if (/^\/components/.test(pathname) || /^\/changelog/.test(pathname)) {
    currentStack = currentStack.concat(<ComponentNav
      backIcon={backIcon}
      router={router}
      pathname={pathname}
    />);
  }
  if (/^\/patterns/.test(pathname)) {
    currentStack = currentStack.concat(<PatternNav
      backIcon={backIcon}
      router={router}
      pathname={pathname}
    />);
  }
  return currentStack;
};

class StandardNav extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  render() {
    const { router } = this.context;
    const { pathname } = router.route.location;
    const globalPrimaryIcon = <AtlassianIcon label="Atlassian icon" size="medium" />;
    return (
      <Navigation
        containerHeaderComponent={Header}
        drawers={[(
          <AkSearchDrawer
            backIcon={backIcon}
            isOpen={this.props.isSearchDrawerOpen}
            key="search"
            onBackButton={() => this.props.onSearchDrawerToggle(false)}
            primaryIcon={globalPrimaryIcon}
          >
            <SearchDrawer
              onResultClicked={() => this.props.onSearchDrawerToggle(false)}
              onSearchInputRef={r => (this.searchInputRef = r)}
            />
          </AkSearchDrawer>
        )]}
        globalPrimaryIcon={<AtlassianIcon size="xlarge" label="Atlassian" />}
        globalPrimaryItemHref="https://atlassian.design"
        globalSearchIcon={<SearchIcon label="Search icon" />}
        isResizeable={false}
        onSearchDrawerOpen={() => {
          this.props.onSearchDrawerToggle(true);
          if (this.searchInputRef) {
            this.searchInputRef.focus();
          }
        }}
      >
        <AkContainerNavigationNested
          stack={getCurrentStack(pathname, router, backIcon)}
        />
      </Navigation>
    );
  }
}

const Nav = ({ isSearchDrawerOpen, onSearchDrawerToggle }) => (
  <Switch>
    <Route
      path="/patterns/:exampleName"
      render={({ match }) => {
        const example = patterns.filter(pattern => pattern.title === match.params.exampleName)[0];
        if (example && example.type === 'navTakeover') {
          const Comp = example.Component;
          return (
            <Comp />
          );
        }
        return (
          <StandardNav
            isSearchDrawerOpen={isSearchDrawerOpen}
            onSearchDrawerToggle={onSearchDrawerToggle}
          />
        );
      }}
    />
    <Route
      render={() => <StandardNav
        isSearchDrawerOpen={isSearchDrawerOpen}
        onSearchDrawerToggle={onSearchDrawerToggle}
      />}
    />
  </Switch>
);

export default Nav;
