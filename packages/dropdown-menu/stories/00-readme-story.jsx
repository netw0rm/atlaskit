import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Readme from '@atlaskit/util-readme';

import { name, description } from '../package.json';

/* eslint-disable import/no-duplicates, import/first */
import statefulComponent from '../src';
import statefulComponentSource from '!raw!../src';
import statefulOverview from './examples/stateful-example';
import statefulOverviewSource from '!raw!./examples/stateful-example';

import statelessComponent from '../src/StatelessMenu';
import statelessComponentSource from '!raw!../src/StatelessMenu';
import statelessOverview from './examples/stateless-example';
import statelessOverviewSource from '!raw!./examples/stateless-example';
/* eslint-enable import/no-duplicates, import/first */

storiesOf(name, module)
  .add('📖 DropdownMenu readme', () => (
    <Readme
      name={name}
      component={statefulComponent}
      componentSource={statefulComponentSource}
      example={statefulOverview}
      exampleSource={statefulOverviewSource}
      description={description}
    />
  ))
  .add('📖 DropdownMenu (Stateless) readme', () => (
    <Readme
      name={name}
      component={statelessComponent}
      componentSource={statelessComponentSource}
      example={statelessOverview}
      exampleSource={statelessOverviewSource}
      description={description}
    />
  ));
