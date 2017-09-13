/**
 * This is what an app might look like
 */

import React, { Component } from 'react';
import { HashRouter, Route, Switch, Link } from 'react-router-dom';

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

const RouterLinkComponent = (props) => {
  const { children, href, ...linkProps } = props;
  return <Link to={href} {...linkProps}>{children}</Link>;
};

const makePage = title => () => (
  <h1>{title}</h1>
);

const backButton = path => () => (
  <AkNavigationItem
    href={path}
    icon={<ArrowLeftIcon label="Back" />}
    linkComponent={RouterLinkComponent}
    text="Back"
  />
);

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
                  <AkNavigationItem href="/movies" linkComponent={RouterLinkComponent} icon={<DashboardIcon label="Dashboard" />} text="Movies" />
                  <AkNavigationItem href="/albums" linkComponent={RouterLinkComponent} icon={<SettingsIcon label="Settings" />} text="Albums" />
                  <AkNavigationItem href="/about" linkComponent={RouterLinkComponent} icon={<TrayIcon label="Projects" />} text="About" />
                </div>
              </Route>
              <Route path="/movies">
                <div>
                  <AkNavigationItem href="/movies/matrix" linkComponent={RouterLinkComponent} icon={<DashboardIcon label="Dashboard" />} text="The Matrix" />
                  <AkNavigationItem href="/movies/lotr" linkComponent={RouterLinkComponent} icon={<DashboardIcon label="Dashboard" />} text="Lord of the Rings" />
                </div>
              </Route>
              <Route path="/albums">
                <div>
                  <AkNavigationItem href="/albums/coexist" linkComponent={RouterLinkComponent} icon={<SettingsIcon label="Settings" />} text="The xx – coexist" />
                  <AkNavigationItem href="/albums/anawesomewave" linkComponent={RouterLinkComponent} icon={<SettingsIcon label="Settings" />} text="Alt J – an awesome wave" />
                  <AkNavigationItem href="/albums/more" linkComponent={RouterLinkComponent} icon={<SettingsIcon label="Settings" />} text="More Albums" />
                </div>
              </Route>
              <Route path="/albums/more">
                <div>
                  <AkNavigationItem href="/albums/more/lonelyheartsclub" linkComponent={RouterLinkComponent} icon={<SettingsIcon label="Settings" />} text="The Beatles – Sgt. Peppers Lonely Hearts Club Band" />
                  <AkNavigationItem href="/albums/more/lonerism" linkComponent={RouterLinkComponent} icon={<SettingsIcon label="Settings" />} text="Tame Impala – Lonerism" />
                </div>
              </Route>
            </ReactRouterNestedNavigation>
          </BasicNavigation>
        </HtmlPage>
      </HashRouter>
    );
  }
}
