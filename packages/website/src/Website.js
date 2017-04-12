/* eslint-disable react/prop-types */

import React, { PureComponent } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Components from './pages/Components';

class Website extends PureComponent {
  render() {
    return (
      <Router>
        <div>
          <h1>AtlasKit</h1>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/components">Components</Link></li>
          </ul>

          <hr />

          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/components" component={Components} />
        </div>
      </Router>
    );
  }
}

export default Website;
