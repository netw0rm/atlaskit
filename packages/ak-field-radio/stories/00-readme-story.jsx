import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Readme, { Code, Props } from 'akutil-readme';

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
      </Readme>
    </div>
  ));
