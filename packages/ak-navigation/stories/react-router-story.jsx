import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { name } from '../package.json';
import TitledPage from './components/react-router/TitledPage';

function makePage(title) {
  return () => <TitledPage title={title} />;
}

storiesOf(name, module)
  .add('with react-router', () => (
    <Router history={browserHistory}>
      <Route path="/iframe.html" component={makePage('Container home')} />
      <Route path="/page1" component={makePage('Page 1')} />
      <Route path="/page2" component={makePage('Page 2')} />
      <Route path="/page3" component={makePage('Page 3')} />
      <Route path="/page4" component={makePage('Page 4')} />
    </Router>
  )
);
