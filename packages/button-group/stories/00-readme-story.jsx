import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Readme, { Code, Props } from '@atlaskit/util-readme';

import ButtonGroupOverviewExample from './examples/ButtonGroupOverview'; // eslint-disable-line import/no-duplicates
import ButtonGroupOverviewExampleRaw from '!raw!./examples/ButtonGroupOverview'; // eslint-disable-line import/no-duplicates, import/first

import { name, description } from '../package.json';
import ButtonGroup from '../src';

const buttonGroupPropDescriptions = {
  children: 'Button elements to be displayed inside the group',
};

storiesOf(name, module)
  .add('📖 ButtonGroup readme', () => (
    <div>
      <Readme
        component={name}
        description={description}
      >
        <Code code={ButtonGroupOverviewExampleRaw}>
          {ButtonGroupOverviewExample}
        </Code>
        <Props component={ButtonGroup} descriptions={buttonGroupPropDescriptions} />
      </Readme>
    </div>
  ));
