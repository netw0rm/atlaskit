/**
 * This is what an app might look like
 */

import React, { Component } from 'react';
import { HashRouter, Link, Route, Switch, withRouter } from 'react-router-dom';

import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left';
import DashboardIcon from '@atlaskit/icon/glyph/dashboard';
import SettingsIcon from '@atlaskit/icon/glyph/settings';
import TrayIcon from '@atlaskit/icon/glyph/tray';

import {
  AkContainerTitle,
  AkNavigationItem,
} from '../../../../src/index';
import nucleusLogo from '../../../nucleus.png';
import BasicNavigation from '../../BasicNavigation';
import HtmlPage from '../../HtmlPage';
import ReactRouterNestedNavigation from './ReactRouterNestedNavigation';

const makePage = title => () => (
  <div>
    <h1>{title}</h1>
    <p>Lorem ipsum</p>
  </div>
);

const RouterLinkComponent = (props) => {
  const { children, href, ...linkProps } = props;
  return <Link to={href} {...linkProps}>{children}</Link>;
};

class NavItemLink extends Component {
  render() {
    const { location, ...props } = this.props;
    return (
      <AkNavigationItem
        linkComponent={RouterLinkComponent}
        isSelected={location.pathname === props.href}
        {...props}
      />
    );
  }
}
const RouterNavItemLink = withRouter(NavItemLink);

const backButton = path => () => (
  <AkNavigationItem
    href={path}
    icon={<ArrowLeftIcon label="Back" />}
    linkComponent={RouterLinkComponent}
    text="Back"
  />
);

// eslint-disable-next-line react/no-multi-comp
export default class App extends Component {
  render() {
    return (
      <HashRouter>
        <HtmlPage
          content={
            <Switch>
              <Route component={makePage('The Matrix')} path="/movies/matrix" />
              <Route component={makePage('Lord of the Rings')} path="/movies/lotr" />
              <Route component={makePage('Movies')} path="/movies" />
              <Route component={makePage('The Beatles – Sgt. Peppers Lonely Hearts Club Band')} path="/albums/more/lonelyheartsclub" />
              <Route component={makePage('Tame Impala – Lonerism')} path="/albums/more/lonerism" />
              <Route component={makePage('More Albums')} path="/albums/more" />
              <Route component={makePage('The xx – coexist')} path="/albums/coexist" />
              <Route component={makePage('Alt J – an awesome wave')} path="/albums/anawesomewave" />
              <Route component={makePage('Albums')} path="/albums" />
              <Route component={makePage('About')} path="/about" />
              <Route component={makePage('Home')} />
            </Switch>
          }
        >
          <BasicNavigation
            containerHeaderComponent={() => (
              <div>
                <AkContainerTitle
                  href="#foo"
                  icon={<img alt="nucleus" src={nucleusLogo} />}
                  text="AtlasKit"
                  subText="Is the king"
                />
                <Switch>
                  <Route component={backButton('/')} path="/movies" />
                  <Route component={backButton('/albums')} path="/albums/more" />
                  <Route component={backButton('/')} path="/albums" />
                </Switch>
              </div>
            )}
          >
            <ReactRouterNestedNavigation>
              <Route path="/">
                <div>
                  <RouterNavItemLink href="/movies" icon={<DashboardIcon label="Dashboard" />} text="Movies" />
                  <RouterNavItemLink href="/albums" icon={<SettingsIcon label="Settings" />} text="Albums" />
                  <RouterNavItemLink href="/about" icon={<TrayIcon label="Projects" />} text="About" />
                </div>
              </Route>
              <Route path="/movies">
                <div>
                  <RouterNavItemLink href="/movies/matrix" icon={<DashboardIcon label="Dashboard" />} text="The Matrix" />
                  <RouterNavItemLink href="/movies/lotr" icon={<DashboardIcon label="Dashboard" />} text="Lord of the Rings" />
                </div>
              </Route>
              <Route path="/albums">
                <div>
                  <RouterNavItemLink href="/albums/coexist" icon={<SettingsIcon label="Settings" />} text="The xx – coexist" />
                  <RouterNavItemLink href="/albums/anawesomewave" icon={<SettingsIcon label="Settings" />} text="Alt J – an awesome wave" />
                  <RouterNavItemLink href="/albums/more" icon={<SettingsIcon label="Settings" />} text="More Albums" />
                </div>
              </Route>
              <Route path="/albums/more">
                <div>
                  <RouterNavItemLink href="/albums/more/lonelyheartsclub" icon={<SettingsIcon label="Settings" />} text="The Beatles – Sgt. Peppers Lonely Hearts Club Band" />
                  <RouterNavItemLink href="/albums/more/lonerism" icon={<SettingsIcon label="Settings" />} text="Tame Impala – Lonerism" />
                </div>
              </Route>
            </ReactRouterNestedNavigation>
          </BasicNavigation>
        </HtmlPage>
      </HashRouter>
    );
  }
}
