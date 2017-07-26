/* eslint-disable no-confusing-arrow */

import React, { PureComponent } from 'react';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
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
import { AtlasKitThemeProvider, theme, themeValue } from '../../../../theme/src';

import { MOBILE_QUERY } from '../../../constants';

import Page from '../../components/Page';

import { NavPackageComponent, StandardComponent } from '../../pages/Component';
import Components from '../../pages/Components';
import Patterns from '../../pages/Patterns';
import Examples from '../../pages/Examples';
import ExampleBase from '../../pages/Navigation/ExampleBase';
import NavExample from '../../pages/Navigation/Example';
import Home from '../../pages/Home';
import NoMatch from '../../pages/NoMatch';
import InstallGuide from '../../pages/InstallGuide';
import pkgs from '../../data';

import Nav from '../Nav';
import MobileNav from '../MobileNav';

import ScrollToTop from './ScrollToTop';

const LOCAL_STORAGE_THEME_MODE_KEY = 'atlaskit-website-themeMode';

const Routes = () =>
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/install" component={InstallGuide} />
    <Route path="/examples" component={Examples} />
    <Route exact path="/patterns" component={Patterns} />
    <Route exact path="/patterns/navigation/examples" component={ExampleBase} />
    <Route
      path="/patterns/navigation/components/:component"
      render={({ match }) => <NavPackageComponent match={match} />}
    />
    <Route
      path="/patterns/navigation/examples/:exampleName"
      component={NavExample}
    />
    <Route exact path="/components" component={Components} />
    <Route
      path="/components/:component"
      render={({ match }) =>
        pkgs[match.params.component] && pkgs[match.params.component].isPattern
          ? <Redirect to={`/patterns/${match.params.component}`} />
          : <StandardComponent match={match} />}
    />
    <Route
      path="/patterns/:component"
      render={({ match }) =>
        pkgs[match.params.component] && !pkgs[match.params.component].isPattern
          ? <Redirect to={`/components/${match.params.component}`} />
          : <StandardComponent match={match} />}
    />
    <Route component={NoMatch} />
  </Switch>;

const MobileView = () =>
  <div>
    <MobileNav />
    <Routes />
    <Footer />
  </div>;

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
  renderDesktopView = () => {
    const { isSearchDrawerOpen, navigationWidth } = this.state;

    return (
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
    );
  };
  render() {
    const DesktopView = this.renderDesktopView;
    const { themeMode } = this.state;
    return (
      <Router>
        <AtlasKitThemeProvider mode={themeMode}>
          <ScrollToTop>
            <Helmet
              defaultTitle="AtlasKit - the official implementation of the Atlassian Design Guidelines"
              titleTemplate="%s | AtlasKit"
            />
            <Media query={MOBILE_QUERY}>
              {matches => (matches ? <MobileView /> : <DesktopView />)}
            </Media>
            <SwitchThemeButton onClick={this.switchTheme} mode={themeMode} title={`Theme: "${themeMode}"`}>
              {themeMode === 'dark'
                ? <LightbulbIcon label="Light off" />
                : <LightbulbFilledIcon label="Light on" />
              }
            </SwitchThemeButton>
          </ScrollToTop>
        </AtlasKitThemeProvider>
      </Router>
    );
  }
}

const SwitchThemeButton = styled.button`
  background-color: ${themeValue('colors.text')};
  border-radius: ${themeValue('base.borderRadius')}px;
  border: 0;
  color: ${p => (p.mode === 'dark'
    ? theme(p).colors.N800
    : theme(p).colors.DN600
  )};
  cursor: pointer;
  height: 3.4em;
  margin: 0;
  outline: 0;
  padding: 0;
  position: fixed;
  right: 10px;
  top: 10px;
  transition: box-shadow 200ms ease-out;
  width: 4em;
  z-index: 1000;

  &:focus {
    box-shadow:
      0 0 0 1px ${themeValue('colors.background')},
      0 0 0 3px ${p => (p.mode === 'dark'
        ? theme(p).colors.link
        : theme(p).colors.B100
      )};
  }
`;

const FooterContainer = styled.div`
  background-color: ${akColorN10};
  border-top: 1px solid ${akColorN30};
  color: ${akColorN100};
  font-size: 0.85em;
  margin-top: ${props => theme(props).gridSize * 6}px;
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
