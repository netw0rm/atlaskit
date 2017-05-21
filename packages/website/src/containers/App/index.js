/* eslint-disable no-confusing-arrow */

import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Helmet from 'react-helmet';
import Media from 'react-media';
import { akColorN10, akColorN30, akColorN100, akGridSizeUnitless } from '@atlaskit/util-shared-styles';
import AtlassianIcon from '@atlaskit/icon/glyph/atlassian';

import { MOBILE_QUERY } from '../../../constants';

import Page from '../../components/Page';

import Component from '../../pages/Component';
import Components from '../../pages/Components';
import Examples from '../../pages/Examples';
import Home from '../../pages/Home';
import NoMatch from '../../pages/NoMatch';
import InstallGuide from '../../pages/InstallGuide';

import Nav from '../Nav';
import MobileNav from '../MobileNav';

import ScrollToTop from './ScrollToTop';

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
  <div>
    <MobileNav />
    <Routes />
    <Footer />
  </div>
);

const Footer = () => (
  <FooterContainer>
    {/* <ul>
      <li><a href="https://twitter.com/Atlassian" target="_blank" rel="noopener noreferrer">Twitter</a></li>
      <li><a href="https://bitbucket.org/atlassian/atlaskit" target="_blank" rel="noopener noreferrer">Bitbucket</a></li>
      <li><a href="https://ecosystem.atlassian.net/projects/AK/issues" target="_blank" rel="noopener noreferrer">Jira</a></li>
      <li><a href="https://atlassian.design" target="_blank" rel="noopener noreferrer">Design</a></li>
    </ul> */}
    <p>Copyright &copy; 2016 Atlassian. Code licensed <a href="https://bitbucket.org/atlassian/atlaskit/src/f57adbf8152967d7afbb876bb8962ffbd3d5da89/LICENSE" target="_blank" rel="noopener noreferrer">Apache 2.0</a>.</p>
    <AtlassianIcon label="Atlassian" />
  </FooterContainer>
);

export default class App extends PureComponent {
  state = {
    isNavigationOpen: true,
    isSearchDrawerOpen: false,
    navigationWidth: 304,
  }
  handleSearchToggle = isSearchDrawerOpen => this.setState({ isSearchDrawerOpen })
  renderDesktopView = () => {
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
    const DesktopView = this.renderDesktopView;

    return (
      <Router>
        <ScrollToTop>
          <Helmet
            defaultTitle="AtlasKit - the official implementation of the Atlassian Design Guidelines"
            titleTemplate="%s | AtlasKit"
          />
          <Media query={MOBILE_QUERY}>
            {matches => matches ? <MobileView /> : <DesktopView />}
          </Media>
        </ScrollToTop>
      </Router>
    );
  }
}

const FooterContainer = styled.div`
  background-color: ${akColorN10};
  border-top: 1px solid ${akColorN30};
  color: ${akColorN100};
  font-size: 0.85em;
  margin-top: ${akGridSizeUnitless * 6}px;
  padding: 2em 1.4em 1.4em;
  text-align: center;

  a { color: inherit; }
  p { margin-bottom: 1em; }
  p > a { text-decoration: underline;}
  ul {
    align-items: center;
    display: inline-flex;
    justify-content: space-around;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  li { margin: 0; }
  li > a { padding: 2px 4px; }
`;
