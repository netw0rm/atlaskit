import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Readme, { Code, Props } from '@atlaskit/util-readme';
import { name, description } from '../package.json';
import ManagedGreeting from '../src/';

// eslint-disable-next-line import/no-duplicates
import OverviewExample from './examples/managed-overview';
// eslint-disable-next-line import/first, import/no-duplicates
import OverviewExampleRaw from '!raw!./examples/managed-overview';

storiesOf(name, module)
  .add('Greeting - managed: README', () => (
    <Readme
      component={name}
      description={description}
    >
      <Code code={OverviewExampleRaw}>
        <OverviewExample />
      </Code>
      <Props component={ManagedGreeting} />
    </Readme>
  ))
  .add('Greeting - managed: basic usage', () => (
    <ManagedGreeting />
  ))
  .add('Greeting - managed: custom name', () => (
    <ManagedGreeting name="Alex" />
  ));

