/* eslint-disable react/prop-types */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Route, Switch } from 'react-router-dom';

import Navigation, {
  AkContainerTitle as NavTitle,
  AkSearchDrawer,
} from '@atlaskit/navigation';

import ArrowLeft from '@atlaskit/icon/glyph/arrow-left';
import AtlassianIcon from '@atlaskit/icon/glyph/atlassian';
import SearchIcon from '@atlaskit/icon/glyph/search';

import atlasKitLogo from '../../images/atlaskit-logo.png';
import SearchDrawer from './SearchDrawer';
import Groups from './Groups';

import { matchNavExample } from '../../pages/Navigation/utils';

const Header = () => (
  <Link to="/" style={{ textDecoration: 'none' }}>
    <NavTitle
      icon={<img alt="Atlaskit Logo" src={atlasKitLogo} />}
      text="Atlaskit"
    />
  </Link>
);

class StandardNav extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  render() {
    const backIcon = <ArrowLeft label="Back icon" />;
    const globalPrimaryIcon = <AtlassianIcon label="Atlassian icon" size="large" />;
    return (
      <Navigation
        containerHeaderComponent={Header}
        drawerBackIcon={<ArrowLeft label="Back icon" size="medium" />}
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
        globalPrimaryIcon={<AtlassianIcon size="large" label="Atlassian" />}
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
        <Groups />
      </Navigation>
    );
  }
}

const Nav = ({ isSearchDrawerOpen, onSearchDrawerToggle }) => (
  <Switch>
    <Route
      path="/components/navigation/examples/:exampleName"
      render={({ match }) => {
        const example = matchNavExample(match.params.exampleName);
        if (example) {
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
