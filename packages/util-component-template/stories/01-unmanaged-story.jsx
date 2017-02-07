import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Readme, { Code, Props } from '@atlaskit/util-readme';
import { name, description } from '../package.json';
import { Greeting } from '../src/';

// eslint-disable-next-line import/no-duplicates
import OverviewExample from './examples/unmanaged-overview';
// eslint-disable-next-line import/first, import/no-duplicates
import OverviewExampleRaw from '!raw!./examples/unmanaged-overview';

storiesOf(name, module)
  .add('Greeting - unmanaged: README', () => (
    <Readme
      component={name}
      description={description}
    >
      <Code code={OverviewExampleRaw}>
        <OverviewExample />
      </Code>
      <Props component={Greeting} />
    </Readme>
  ))
  .add('Greeting - unmanaged: basic usage', () => (
    <Greeting />
  ))
  .add('Greeting - unmanaged: custom name', () => (
    <Greeting name="Alex" />
  ))
  .add('Greeting - unmanaged: custom onSpeak', () => (
    <Greeting name="Alex" onSpeak={action('onSpeak')} />
  ));

