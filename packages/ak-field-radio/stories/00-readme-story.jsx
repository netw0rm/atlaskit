import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Readme, { Code, Props } from 'akutil-readme';

/* eslint-disable import/first, import/no-duplicates */
import RadioGroupOverviewExample from './examples/RadioGroupOverview';
import RadioGroupExampleRaw from '!raw!./examples/RadioGroupOverview';
/* eslint-enable import/first, import/no-duplicates */

import { name, description } from '../package.json';
import RadioGroup from '../src';

const radioGroupPropDescriptions = {
  items: 'An array of objects describing the radio buttons to render.',
  label: 'The text to display above the radio buttons. Should describes the group of radio buttons and prompt the user action.',
  onRadioChange: 'Function to call when a radio is selected and fires a change event. This should update the items property to select the newly-selected item.',
};

const readmeDescription = `${description}. This is the smart (uncontrolled) version of this component, which handles its own state.`;

storiesOf(name, module)
  .add('RadioGroup readme', () => (
    <div>
      <Readme
        component={name}
        description={readmeDescription}
      >
        <Code code={RadioGroupExampleRaw}>
          {RadioGroupOverviewExample}
        </Code>
        <Props component={RadioGroup} descriptions={radioGroupPropDescriptions} />
      </Readme>
    </div>
  ));
