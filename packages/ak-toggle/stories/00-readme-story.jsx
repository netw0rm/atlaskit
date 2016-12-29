import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Readme, { Props, Code } from 'akutil-readme';
import ExampleRaw from '!raw!./ToggleExample'; // eslint-disable-line import/no-duplicates
import { name } from '../package.json';
import { Toggle } from '../src';
import Example from './ToggleExample'; // eslint-disable-line import/no-duplicates

const togglePropDescriptions = {
  isChecked: 'Weather the toggle is checked or not',
  isDisabled: 'Weather the toggle is disabled or not. This will prevent any interaction with the user',
  name: 'Descriptive name for value property to be submitted in a form',
  value: 'The value to be submitted in a form',
  labelWhenChecked: 'Label to be set for accessibility when the toggle is checked (on)',
  labelWhenUnchecked: 'Label to be set for accessibility when the toggle is unchecked (off)',
  onChange: 'Callback to be called when native \'change\' event happens internally. Example: when user clicks on the toggle or focus the toggle and press space bar',
  onFocus: 'Callback to be called when toggle is focused',
  onBlur: 'Callback to be called when toggle is unfocused',
};

const description = `Toggles are a quick way to view and switch between enabled or disabled states.
Use toggles when your main intent is to turn something on or off`;

storiesOf(name, module)
  .add('Readme', () => (
    <div>
      <Readme
        component={name}
        description={description}
      >
        <Code code={ExampleRaw}>
          {Example}
        </Code>
        <Props component={Toggle} descriptions={togglePropDescriptions} />
      </Readme>
    </div>
  ));
