import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Readme, { Code, Props } from '@atlaskit/util-readme';
import { name, description } from '../package.json';
import AkHorizontalNavigation from '../src/';

/* eslint-disable import/no-duplicates, import/first */
import OverviewExample from './examples/stateful-overview';
import OverviewExampleRaw from '!raw!./examples/stateful-overview';
/* eslint-enable import/no-duplicates, import/first */

storiesOf(name, module)
  .add('HorizontalNavigation - stateful: README', () => (
    <Readme
      component={name}
      description={description}
    >
      <Code code={OverviewExampleRaw}>
        <OverviewExample />
      </Code>
      <Props component={AkHorizontalNavigation} />
    </Readme>
  ))
  .add('HorizontalNavigation - stateful: basic usage', () => (
    <AkHorizontalNavigation label="My toggle" />
  ));
