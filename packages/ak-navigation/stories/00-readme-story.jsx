import React from 'react';
import Readme, { Code, Props } from 'akutil-readme';
import { storiesOf } from '@kadira/storybook';

/* eslint-disable import/no-duplicates */
import NavigationRaw from '!raw!./examples/Navigation';
import Navigation from './examples/Navigation';
/* eslint-enable import/no-duplicates */

import { name, description } from '../package.json';

const navigationPropDescriptions = {

};

storiesOf(name, module)
  .add('Navigation readme', () => (
    <Readme
      component={name}
      description={description}
    >
      <Code code={NavigationRaw}>
        {Navigation}
      </Code>
      <Props component={Navigation} descriptions={navigationPropDescriptions} />
    </Readme>
  ))
  .add('Global Navigation readme', () => (
    <Readme
      component={name}
      description={description}
    >
      <Code code={NavigationRaw}>
        {Navigation}
      </Code>
      <Props component={Navigation} descriptions={navigationPropDescriptions} />
    </Readme>
  ));
