import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import webComponent from '../src/index';
const { React, ReactDOM } = window;
import { name } from '../package.json';

import AkNavigation from 'ak-navigation';

const Component = reactify(webComponent, {
  React,
  ReactDOM,
});

const Navigation = reactify(AkNavigation, {
  React,
  ReactDOM,
});

storiesOf(name, module)
.add('a simple ak-page', () => (
  <Component>
    <div style={{ border: '1px solid black' }} slot="navigation">Navigation</div>
    <div>Main</div>
  </Component>
  ))
  .add('a simple ak-page with navigation', () => (
    <Component>
      <Navigation slot="navigation" open />
      <div>Content</div>
    </Component>
  ));
