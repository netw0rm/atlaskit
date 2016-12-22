import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Readme, { Code, Description, Heading, Props } from 'akutil-readme';

/* eslint-disable import/first, import/no-duplicates */
import RadioGroupExample from './readme/RadioGroupOverview';
import RadioGroupExampleRaw from '!raw!./readme/RadioGroupOverview';

import RadioGroupSmartExample from './readme/RadioGroupOverviewSmart';
import RadioGroupSmartExampleRaw from '!raw!./readme/RadioGroupOverviewSmart';
/* eslint-enable import/first, import/no-duplicates */

import { name } from '../package.json';
import RadioGroup, { AkRadioGroup } from '../src';
import {
  radioGroupPropDescriptions,
  readmeDescription,
  readmeDescriptionSmart,
  itemsProps,
  itemsPropsSmart,
} from './readme/readme-constants';

storiesOf(name, module)
  .add('RadioGroup readme (smart)', () => (
    <div>
      <Readme
        component={name}
        description={readmeDescriptionSmart}
      >
        <Code code={RadioGroupSmartExampleRaw}>
          {RadioGroupSmartExample}
        </Code>
        <Props component={RadioGroup} descriptions={radioGroupPropDescriptions} />
        <Description>
          <Heading type="3">Items property</Heading>
          <p>
            The items property describes the radio items that should be rendered in the radio group.
          </p>
          <p>Each item can contain the follow keys:</p>
          <ul>
            {itemsPropsSmart.map((item, index) =>
              (<li key={index}><b>{item.name}</b> <i>({item.type})</i>: {item.description}</li>)
            )}
          </ul>
        </Description>
      </Readme>
    </div>
  ))
  .add('RadioGroup readme (dumb)', () => (
    <div>
      <Readme
        component={name}
        description={readmeDescription}
      >
        <Code code={RadioGroupExampleRaw}>
          {RadioGroupExample}
        </Code>
        <Props component={AkRadioGroup} descriptions={radioGroupPropDescriptions} />
        <Description>
          <Heading type="3">Items property</Heading>
          <p>
            The items property describes the radio items that should be rendered in the radio group.
          </p>
          <p>Each item can contain the follow keys:</p>
          <ul>
            {itemsProps.map((item, index) =>
              (<li key={index}><b>{item.name}</b> <i>({item.type})</i>: {item.description}</li>)
            )}
          </ul>
        </Description>
      </Readme>
    </div>
  ));
