/* eslint-disable react/prop-types */

import React, { PureComponent } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';

import Navigation, {
  AkContainerItem as NavigationContainerItem,
  AkContainerTitle as NavigationContainerTitle,
  AkContainerItemGroup as NavigationContainerItemGroup,
} from '@atlaskit/navigation';

import Home from './pages/Home';
import About from './pages/About';
import Components from './pages/Components';

import reactIcon from './images/react-256.jpg';

import atlaskitComponents from './components';

const atlaskitComponentKeys = Object.keys(atlaskitComponents);

class Website extends PureComponent {
  render() {
    return (
      <Router>
        <div
          style={{
            display: 'flex',
            height: '100vh',
            overflowY: 'scroll',
            boxSizing: 'border-box',
          }}
        >
          <Navigation>
            <Link to="/">
              <NavigationContainerTitle
                icon={<img alt="nucleus" src={reactIcon} />}
                text="AtlasKit"
              />
            </Link>
            <NavigationContainerItemGroup title="Components">
              {atlaskitComponentKeys.map((key) => {
                const component = atlaskitComponents[key];
                const url = `/components/${key}`;
                return (
                  <Link to={url} key={key}>
                    <NavigationContainerItem
                      // icon={<Icon label={component.name} size="small" />}
                      text={component.name}
                      // isSelected={this.context.router.isActive(url, true)}
                    />
                  </Link>
                );
              })}
            </NavigationContainerItemGroup>
          </Navigation>
          <div
            style={{
              padding: '32px',
              height: '100vh',
              overflowY: 'scroll',
              width: 'auto',
            }}
          >
            <h1>AtlasKit</h1>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/components" component={Components} />
          </div>
        </div>
      </Router>
    );
  }
}

export default Website;
