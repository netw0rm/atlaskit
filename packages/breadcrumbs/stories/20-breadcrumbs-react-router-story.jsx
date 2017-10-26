import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { name } from '../package.json';
import TitledPage from './component/TitledPage';

const imports: Array<Array<string>> = [
  ['React', 'react'],
  ['Breadcrumbs, { BreadcrumbsItem }', 'ak-breadcrumbs'],
];

function makePage(title) {
  return () => <TitledPage title={title} />;
}

storiesOf(name, module)
  .addCodeExampleStory('with react-router', () => (
    <Router>
      <div>
        <Route component={makePage('Container home')} />
        <Route component={makePage('Page 1')} path="/page1" />
        <Route component={makePage('Page 2')} path="/page2" />
        <Route component={makePage('Page 3')} path="/page3" />
        <Route component={makePage('Page 4')} path="/page4" />
      </div>
    </Router>
    ),
    { imports }
  );
