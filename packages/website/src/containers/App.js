/* eslint-disable no-confusing-arrow */

import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Helmet from 'react-helmet';
import Media from 'react-media';

import { MOBILE_QUERY } from '../../constants';

import Page from '../components/Page';

import Component from '../pages/Component';
import Components from '../pages/Components';
import Examples from '../pages/Examples';
import Home from '../pages/Home';
import NoMatch from '../pages/NoMatch';
import InstallGuide from '../pages/InstallGuide';

import Nav from './Nav';
import MobileNav from './MobileNav';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/install" component={InstallGuide} />
    <Route path="/examples" component={Examples} />
    <Route exact path="/components" component={Components} />
    <Route path="/components/:component" component={Component} />
    <Route component={NoMatch} />
  </Switch>
);

const MobileView = () => (
  <Page>
    <MobileNav />
    <Routes />
  </Page>
);

export default class App extends PureComponent {
  state = {
    isNavigationOpen: true,
    isSearchDrawerOpen: false,
    navigationWidth: 304,
  }
  handleSearchToggle = (isSearchDrawerOpen) => {
    this.setState({ isSearchDrawerOpen });
  }
  renderDesktopView() {
    const { isSearchDrawerOpen, navigationWidth } = this.state;
    return (
      <Page
        navigationWidth={navigationWidth}
        navigation={(
          <Nav
            isSearchDrawerOpen={isSearchDrawerOpen}
            onSearchDrawerToggle={this.handleSearchToggle}
          />
        )}
      >
        <Routes />
      </Page>
    );
  }
  render() {
    return (
      <Router>
        <div>
          <Helmet
            defaultTitle="AtlasKit - the official implementation of the Atlassian Design Guidelines"
            titleTemplate="%s | AtlasKit"
          />
          <Media query={MOBILE_QUERY}>
            {matches => matches ? <MobileView /> : this.renderDesktopView()}
          </Media>
        </div>
      </Router>
    );
  }
}
