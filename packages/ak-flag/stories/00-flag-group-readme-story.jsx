import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Readme, { Code, Props } from 'akutil-readme';

import FlagGroupExampleRaw from '!raw!./examples/FlagGroupExample'; // eslint-disable-line import/first, import/no-duplicates

import { name, description } from '../package.json';
import { FlagGroup } from '../src';

const flagGroupPropDescriptions = {
  children: 'Flag elements to be displayed',
  onDismissed: 'Handler to be called once a Flag is dismissed and its animation has finished. Receives the id of the dismissed Flag as a parameter.',
};

const flagGroupPropTypes = {
  children: 'node',
  onDismissed: 'func',
};

storiesOf(name, module)
  .add('📖 Flag Group readme', () => (
    <div>
      <Readme
        component={name}
        description={description}
      >
        <Code code={FlagGroupExampleRaw} />
        <Props
          component={FlagGroup}
          descriptions={flagGroupPropDescriptions}
          types={flagGroupPropTypes}
        />
      </Readme>
    </div>
  ));
