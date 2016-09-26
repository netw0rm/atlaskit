import { name } from '../package.json';
import { storiesOf } from '@kadira/storybook';
import React from 'react';
import reactify from 'akutil-react';
import WebComponent from '../src';

const ReactComponent = reactify(WebComponent);

storiesOf(name, module)
  .add('a simple ak-calendar', () => (
    <ReactComponent />
  ));
