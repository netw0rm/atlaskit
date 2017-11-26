/* eslint-disable no-confusing-arrow */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Helmet from 'react-helmet';
import Media from 'react-media';
import {
  akColorN10,
  akColorN30,
  akColorN100,
} from '@atlaskit/util-shared-styles';
import LightbulbIcon from '@atlaskit/icon/glyph/lightbulb';
import LightbulbFilledIcon from '@atlaskit/icon/glyph/lightbulb-filled';
import AtlassianIcon from '@atlaskit/icon/glyph/atlassian';
import { AtlasKitThemeProvider, borderRadius, colors, gridSize, math, themed } from '@atlaskit/theme';
import { GOOGLE_ANALYTICS_ID, MOBILE_QUERY } from '../../../constants';

import Page from '../../components/Page';

import { NavPackageComponent, StandardComponent } from '../../pages/Component';
import Changelog from '../../pages/Changelog';
import Components from '../../pages/Components';
import Examples from '../../pages/Examples';
import ExampleBase from '../../pages/Navigation/ExampleBase';
import NavExample from '../../pages/Navigation/Example';
import Home from '../../pages/Home';
import NoMatch from '../../pages/NoMatch';
import InstallGuide from '../../pages/InstallGuide';

import Nav from '../Nav';
import MobileNav from '../MobileNav';
import GoogleAnalyticsListener from '../../components/GoogleAnalyticsListener';

import ScrollToTop from './ScrollToTop';

const LOCAL_STORAGE_THEME_MODE_KEY = 'atlaskit-website-themeMode';

const SiteAnlaytics = ({ children }) => {
  if (process.env.ATLASKIT_SITE_ENV === 'production') {
    return (
      <GoogleAnalyticsListener gaId={GOOGLE_ANALYTICS_ID}>
        {children}
      </GoogleAnalyticsListener>
    );
  }
  return children;
};
SiteAnlaytics.propTypes = {
  children: PropTypes.node,
};

const Routes = () =>
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/install" component={InstallGuide} />
    <Route path="/examples" component={Examples} />
    <Route exact path="/components/navigation/examples" component={ExampleBase} />
    <Route path="/components/navigation/components/:component" render={({ match }) => <NavPackageComponent match={match} />} />
    <Route path="/components/navigation/examples/:exampleName" component={NavExample} />
    <Route exact path="/components" component={Components} />
    <Route
      path="/components/:component"
      render={({ match }) => (
        <StandardComponent match={match} />
      )}
    />
    <Route path="/changelog/:component/:semver?" component={Changelog} />
    <Route component={NoMatch} />
  </Switch>;
const Footer = () =>
  <FooterContainer>
    {/* <ul>
      <li><a href="https://twitter.com/Atlassian" target="_blank" rel="noopener noreferrer">Twitter</a></li>
      <li><a href="https://bitbucket.org/atlassian/atlaskit" target="_blank" rel="noopener noreferrer">Bitbucket</a></li>
      <li><a href="https://ecosystem.atlassian.net/projects/AK/issues" target="_blank" rel="noopener noreferrer">Jira</a></li>
      <li><a href="https://atlassian.design" target="_blank" rel="noopener noreferrer">Design</a></li>
    </ul> */}
    <p>
      Copyright &copy; 2017 Atlassian. Code licensed{' '}
      <a
        href="https://bitbucket.org/atlassian/atlaskit/src/f57adbf8152967d7afbb876bb8962ffbd3d5da89/LICENSE"
        target="_blank"
        rel="noopener noreferrer"
      >
        Apache 2.0
      </a>.
    </p>
    <AtlassianIcon label="Atlassian" />
  </FooterContainer>;

export default class App extends PureComponent {
  state = {
    isNavigationOpen: true,
    isSearchDrawerOpen: false,
    navigationWidth: 304,
    themeMode: localStorage.getItem(LOCAL_STORAGE_THEME_MODE_KEY) || 'light',
  };
  handleSearchToggle = isSearchDrawerOpen => {
    this.setState({ isSearchDrawerOpen });
  };
  switchTheme = () => {
    const themeMode = this.state.themeMode === 'dark' ? 'light' : 'dark';
    localStorage.setItem(LOCAL_STORAGE_THEME_MODE_KEY, themeMode);
    this.setState({ themeMode });
  };
  renderMobileView = () => (
    <SiteAnlaytics>
      <div>
        <MobileNav />
        <Routes />
        <Footer />
      </div>
    </SiteAnlaytics>
  );
  renderDesktopView = () => {
    const { isSearchDrawerOpen, navigationWidth } = this.state;
    return (
      <SiteAnlaytics>
        <Page
          navigationWidth={navigationWidth}
          navigation={
            <Nav
              isSearchDrawerOpen={isSearchDrawerOpen}
              onSearchDrawerToggle={this.handleSearchToggle}
            />
          }
        >
          <Routes />
        </Page>
      </SiteAnlaytics>
    );
  };
  render() {
    const DesktopView = this.renderDesktopView;
    const MobileView = this.renderMobileView;
    const { themeMode } = this.state;
    return (
      <Router>
        <AtlasKitThemeProvider mode={themeMode}>
          <ScrollToTop>
            <Helmet
              defaultTitle="Atlaskit - the official implementation of the Atlassian Design Guidelines"
              titleTemplate="%s | Atlaskit"
            />
            <Media query={MOBILE_QUERY}>
              {matches => (matches ? <MobileView /> : <DesktopView />)}
            </Media>
            {
              process.env.ATLASKIT_SITE_ENV !== 'production' ? (
                <SwitchThemeButton onClick={this.switchTheme} title={`Theme: "${themeMode}"`}>
                  {themeMode === 'dark'
                    ? <LightbulbIcon label="Light off" />
                    : <LightbulbFilledIcon label="Light on" />
                  }
                </SwitchThemeButton>
              ) : null
            }
          </ScrollToTop>
        </AtlasKitThemeProvider>
      </Router>
    );
  }
}

const SwitchThemeButton = styled.button`
  background-color: ${themed({ dark: colors.DN600, light: colors.N900 })};
  border-radius: ${borderRadius}px;
  border: 0;
  color: ${themed({ dark: colors.N800, light: colors.DN600 })};
  cursor: pointer;
  height: 3.4em;
  margin: 0;
  outline: 0;
  padding: 0;
  position: fixed;
  right: ${math.multiply(gridSize, 2)}px;
  top: ${math.multiply(gridSize, 2)}px;
  transition: box-shadow 200ms ease-out;
  width: 4em;
  z-index: 1000;

  &:hover {
    background-color: ${themed({ dark: colors.DN700, light: colors.N800 })};
    color: ${themed({ dark: colors.N900, light: colors.DN700 })};
  }
  &:focus {
    box-shadow:
      0 0 0 1px ${colors.background},
      0 0 0 3px ${themed({ dark: colors.link, light: colors.B100 })};
  }

  @media ${MOBILE_QUERY} {
    bottom: ${math.multiply(gridSize, 2)}px;
    top: auto;
  }
`;

const FooterContainer = styled.div`
  background-color: ${akColorN10};
  border-top: 1px solid ${akColorN30};
  color: ${akColorN100};
  font-size: 0.85em;
  margin-top: ${math.multiply(gridSize, 6)}px;
  padding: 2em 1.4em 1.4em;
  text-align: center;

  a {
    color: inherit;
  }
  p {
    margin-bottom: 1em;
  }
  p > a {
    text-decoration: underline;
  }
  ul {
    align-items: center;
    display: inline-flex;
    justify-content: space-around;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  li {
    margin: 0;
  }
  li > a {
    padding: 2px 4px;
  }
`;
