import { storiesOf } from '@kadira/storybook';
import React from 'react';

import Tag from '../src';
import { name } from '../package.json';


const Component = (Tag);

storiesOf(name, module)
  .add('href: custom link', () => (
    <Component
      href="https://www.atlassian.com/search?query=Carrot%20cake"
      text="Carrot cake"
    />
  ));
