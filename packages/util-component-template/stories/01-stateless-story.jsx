import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Readme, { Code, Props } from '@atlaskit/util-readme';
import { name, description } from '../package.json';
import { Toggle } from '../src/';

/* eslint-disable import/no-duplicates, import/first */
import OverviewExample from './examples/stateless-overview';
import OverviewExampleRaw from '!raw!./examples/stateless-overview';
/* eslint-enable import/no-duplicates, import/first */

const imports = [['React', 'react'], ['Toggle', '@atlaskit/TEST']];

storiesOf(name, module)
  .add('Toggle - stateless: README', () => (
    <Readme
      component={name}
      description={description}
    >
      <Code code={OverviewExampleRaw}>
        <OverviewExample />
      </Code>
      <Props component={Toggle} />
    </Readme>
  ))
  .addCodeExampleStory('Toggle - stateless: basic usage', () => (
    <Toggle
      onToggle={action('onToggle')}
    />
  ), { imports })
  .addCodeExampleStory('Toggle - stateless: custom label', () => (
    <Toggle
      label="Power station"
      onToggle={action('onToggle')}
    />
  ));

