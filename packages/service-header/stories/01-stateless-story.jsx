import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Readme, { Code, Props } from '@atlaskit/util-readme';
import { name, description } from '../package.json';
import { ServiceHeader } from '../src/';

/* eslint-disable import/no-duplicates, import/first */
import OverviewExample from './examples/stateless-overview';
import OverviewExampleRaw from '!raw!./examples/stateless-overview';
/* eslint-enable import/no-duplicates, import/first */

const imports = [['React', 'react'], ['ServiceHeader', '@atlaskit/TEST']];

storiesOf(name, module)
  .add('ServiceHeader - stateless: README', () => (
    <Readme
      component={name}
      description={description}
    >
      <Code code={OverviewExampleRaw}>
        <OverviewExample />
      </Code>
      <Props component={ServiceHeader} />
    </Readme>
  ))
  .addCodeExampleStory('ServiceHeader - stateless: basic usage', () => (
    <ServiceHeader
      onServiceHeader={action('onServiceHeader')}
    />
  ), { imports })
  .addCodeExampleStory('ServiceHeader - stateless: custom label', () => (
    <ServiceHeader
      label="Power station"
      onServiceHeader={action('onServiceHeader')}
    />
  ));

