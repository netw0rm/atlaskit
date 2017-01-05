import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Readme, { Code, Props } from 'akutil-readme';

import FlagExample from './examples/FlagExample'; // eslint-disable-line import/no-duplicates

import FlagExampleRaw from '!raw!./examples/FlagExample'; // eslint-disable-line import/first, import/no-duplicates
import FlagGroupExampleRaw from '!raw!./examples/FlagGroupExample'; // eslint-disable-line import/first, import/no-duplicates

import { name, description } from '../package.json';
import Flag, { FlagGroup } from '../src';

const flagPropDescriptions = {
  id: 'A unique identifier used for rendering and onDismissed callbacks',
  icon: 'The icon displayed in the top-left of the flag. Should be an instance of `ak-icon`',
  title: 'The bold text shown at the top of the flag',
  description: 'The secondary text shown below the flag title',

  onDismissed: '(private)',
  onAnimationFinished: '(private)',
  isActiveFlag: '(private)',
  isDismissAllowed: '(private)',
  isEntering: '(private)',
  isMovingToPrimary: '(private)',
  isExiting: '(private)',
};

const flagGroupPropDescriptions = {
  children: 'Flag elements to be displayed',
  onDismissed: 'Handler to be called once a Flag is dismissed and its animation has finished',
};

storiesOf(name, module)
  .add('Flag readme', () => (
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
        <Props component={Flag} descriptions={flagPropDescriptions} />
      </Readme>
      <Readme
        component="FlagGroup"
        description="A container for Flag elements, co-ordinates the Flag animations and notifies the app when a Flag is dismissed."
      >
        <Code code={FlagGroupExampleRaw} />
        <Props component={FlagGroup} descriptions={flagGroupPropDescriptions} />
      </Readme>
    </div>
  ));
