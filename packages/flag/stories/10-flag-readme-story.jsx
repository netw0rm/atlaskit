import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Readme, { Code, Props } from '@atlaskit/util-readme';

import FlagExample from './examples/FlagExample'; // eslint-disable-line import/no-duplicates
import FlagExampleRaw from '!raw!./examples/FlagExample'; // eslint-disable-line import/first, import/no-duplicates

import { name, description } from '../package.json';
import Flag from '../src';

const flagPropDescriptions = {
  actions: 'Optional array of clickable actions to be shown at the bottom of the flag',
  description: 'The secondary content shown below the flag title',
  id: 'A unique identifier used for rendering and onDismissed callbacks',
  icon: 'The icon displayed in the top-left of the flag. Should be an instance of `ak-icon`',
  title: 'The bold text shown at the top of the flag',

  onDismissed: 'Private, do not use. Use the FlagGroup onDismissed handler.',
  isDismissAllowed: 'Private, do not use.',
};

const flagPropTypes = {
  actions: 'arrayOf(shape({content, onClick})),',
  description: 'node',
  id: 'oneOfType([string, number])',
  icon: 'ak-icon',
  title: 'string',

  onDismissed: 'func',
  isDismissAllowed: 'bool',
};

storiesOf(name, module)
  .add('📖 Flag readme', () => (
    <div>
      <Readme
        component={name}
        description={description}
      >
        <Code code={FlagExampleRaw}>
          <div style={{ maxWidth: 400 }}>
            {FlagExample}
          </div>
        </Code>
        <Props
          component={Flag}
          descriptions={flagPropDescriptions}
          types={flagPropTypes}
        />
      </Readme>
    </div>
  ));
