import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Readme, { Code, Props } from '@atlaskit/util-readme';

import FieldTextOverviewExampleRaw from '!raw!./examples/FieldTextOverview'; // eslint-disable-line import/no-duplicates
import FieldTextOverviewExample from './examples/FieldTextOverview'; // eslint-disable-line import/no-duplicates

import { name, description } from '../package.json';
import { FieldText } from '../src';

const fieldTextPropDescriptions = {
  compact: 'Whether to use compact sizing for the field.',
  type: 'The type of control to display.',
  disabled: 'Whether the field is disabled.',
  required: 'Whether the field is required.',
  label: 'The label to be rendered next to the supplied text input.',
  name: 'The name of the field, which is submitted with the form data.',
  placeholder: 'A hint to the user of what can be entered in the control.',
  value: 'The value of the input field.',
  onChange: 'Callback to update input value',
  id: 'The id of the field text',
  isLabelHidden: 'Whether the field should show a label above it. If set to true no label will be shown and no space will be reserved for it.',
  shouldFitContainer: 'Whether or not the field should fill the width of its container.',
  autoFocus: 'Whether the field should have focus when the page loads.',
};

storiesOf(name, module)
  .add('📖 Field Text readme', () => (
    <div>
      <Readme
        component={name}
        description={description}
      >
        <Code code={FieldTextOverviewExampleRaw}>
          {FieldTextOverviewExample}
        </Code>
        <Props component={FieldText} descriptions={fieldTextPropDescriptions} />
      </Readme>
    </div>
  ));
