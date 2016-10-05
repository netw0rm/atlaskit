import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import {
  ValidatorMinLength,
  ValidatorMaxLength,
  ValidatorRequired,
} from '../src';
import React from 'react';

const ReactValidatorMinLength = reactify(ValidatorMinLength);
const ReactValidatorMaxLength = reactify(ValidatorMaxLength);
const ReactValidatorRequired = reactify(ValidatorRequired);

storiesOf(name, module)
  .add('min-length validator', () => (
    <ReactValidatorMinLength minLength="10">
      Must have at most 10 characters
    </ReactValidatorMinLength>
  ))
  .add('max-length validator', () => (
    <ReactValidatorMaxLength maxLength="10">
      Must have at least 10 characters
    </ReactValidatorMaxLength>
  ))
  .add('required validator', () => (
    <ReactValidatorRequired>
      Field is required
    </ReactValidatorRequired>
  ));
