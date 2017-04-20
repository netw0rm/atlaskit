import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Helmet from 'react-helmet';

import Page from '../components/Page';

import ComponentSwitch from '../pages/ComponentSwitch';
import Examples from '../pages/Examples';
import Home from '../pages/Home';
import NoMatch from '../pages/NoMatch';
import InstallGuide from '../pages/InstallGuide';

import Nav from './Nav';

export default class App extends PureComponent {
  state = {
    isNavigationOpen: true,
    isSearchDrawerOpen: false,
    navigationWidth: 304,
  }
  handleSearchToggle = (isSearchDrawerOpen) => {
    this.setState({ isSearchDrawerOpen });
  }
  render() {
    const { isSearchDrawerOpen, navigationWidth } = this.state;
    return (
      <Router>
        <Page
          navigationWidth={navigationWidth}
          navigation={(
            <Nav
              isSearchDrawerOpen={isSearchDrawerOpen}
              onSearchDrawerToggle={this.handleSearchToggle}
            />
          )}
        >
          <Helmet titleTemplate="%s | AtlasKit" />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/install" component={InstallGuide} />
            <Route path="/examples" component={Examples} />
            <Route path="/components" component={ComponentSwitch} />
            <Route component={NoMatch} />
          </Switch>
        </Page>
      </Router>
    );
  }
}

// const Transition = styled(RACTG)``;
