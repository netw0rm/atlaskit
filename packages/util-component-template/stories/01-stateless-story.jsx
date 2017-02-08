import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Readme, { Code, Props } from '@atlaskit/util-readme';
import { name, description } from '../package.json';
import { StatelessToggle } from '../src/';

/* eslint-disable import/no-duplicates, import/first */
import OverviewExample from './examples/stateless-overview';
import OverviewExampleRaw from '!raw!./examples/stateless-overview';
/* eslint-enable import/no-duplicates, import/first */

storiesOf(name, module)
  .add('Toggle - stateless: README', () => (
    <Readme
      component={name}
      description={description}
    >
      <Code code={OverviewExampleRaw}>
        <OverviewExample />
      </Code>
      <Props component={StatelessToggle} />
    </Readme>
  ))
  .add('Toggle - stateless: basic usage', () => (
    <StatelessToggle
      onToggle={action('onToggle')}
    />
  ))
  .add('Toggle - stateless: custom label', () => (
    <StatelessToggle
      label="Power station"
      onToggle={action('onToggle')}
    />
  ));

