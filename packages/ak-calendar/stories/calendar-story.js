import { storiesOf } from '@kadira/storybook';
import React from 'react';
import reactify from 'akutil-react';

import { name } from '../package.json';
import WebComponent from '../src';

const ReactComponent = reactify(WebComponent);

storiesOf(name, module)
  .add('default', () => (
    <ReactComponent />
  ))
  .add('disableNavigation: true', () => (
    <ReactComponent disableNavigation />
  ));
