import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import webComponent from '../src/index';
import React from 'react';
import { name } from '../package.json';

import AkNavigation from 'ak-navigation';

const Component = reactify(webComponent);

const Navigation = reactify(AkNavigation);

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
