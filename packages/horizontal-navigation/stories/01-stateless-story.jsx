import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Readme, { Code, Props } from '@atlaskit/util-readme';
import { name, description } from '../package.json';
import { HorizontalNavigation } from '../src/';

/* eslint-disable import/no-duplicates, import/first */
import OverviewExample from './examples/stateless-overview';
import OverviewExampleRaw from '!raw!./examples/stateless-overview';
/* eslint-enable import/no-duplicates, import/first */

const imports = [['React', 'react'], ['HorizontalNavigation', '@atlaskit/TEST']];

storiesOf(name, module)
  .add('HorizontalNavigation - stateless: README', () => (
    <Readme
      component={name}
      description={description}
    >
      <Code code={OverviewExampleRaw}>
        <OverviewExample />
      </Code>
      <Props component={HorizontalNavigation} />
    </Readme>
  ))
  .addCodeExampleStory('HorizontalNavigation - stateless: basic usage', () => (
    <HorizontalNavigation
      onHorizontalNavigation={action('onHorizontalNavigation')}
    />
  ), { imports })
  .addCodeExampleStory('HorizontalNavigation - stateless: custom label', () => (
    <HorizontalNavigation
      label="Power station"
      onHorizontalNavigation={action('onHorizontalNavigation')}
    />
  ));

