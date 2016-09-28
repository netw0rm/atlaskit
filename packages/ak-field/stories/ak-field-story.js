import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import WebComponent from '../src';
import React from 'react';
import { name } from '../package.json';
import { ValidatorMinLength, ValidatorMaxLength } from 'ak-validator';
import TextField from 'ak-text-field';

const Component = reactify(WebComponent);
const ReactValidatorMinLength = reactify(ValidatorMinLength);
const ReactValidatorMaxLength = reactify(ValidatorMaxLength);
const ReactTextField = reactify(TextField);

storiesOf(name, module)
  .add('a simple ak-field', () => (
    <form style={{ width: '500px' }}>
      <Component
        helpIcon
      >
        <ReactValidatorMinLength
          is slot="validator"
          minLength={5}
          message="Must have at least 5 characters"
        />
        <ReactValidatorMaxLength
          is slot="validator"
          maxLength={10}
          message="Must have 10 or less characters"
        />
        <ReactTextField is slot="input" label="My text field" />
      </Component>
    </form>
  ));
