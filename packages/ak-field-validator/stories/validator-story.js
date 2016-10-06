import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import {
  ValidatorMinlength,
  ValidatorMaxlength,
  ValidatorRequired,
} from '../src';
import React from 'react';

const ReactValidatorMinlength = reactify(ValidatorMinlength);
const ReactValidatorMaxlength = reactify(ValidatorMaxlength);
const ReactValidatorRequired = reactify(ValidatorRequired);

storiesOf(name, module)
  .add('pre-defined validators with default content', () => (
    <div>
      <div><ReactValidatorMinlength minlength="1" valid /></div>
      <div><ReactValidatorMaxlength maxlength="10" valid /></div>
      <div><ReactValidatorRequired valid /></div>
    </div>
  ))
  .add('pre-defined validators with custom mesages', () => (
    <div>
      <div><ReactValidatorMinlength minlength="10" valid>
        Custom message for minlength validator
      </ReactValidatorMinlength></div>
      <div><ReactValidatorMaxlength maxlength="10" valid>
        Custom message for maxlength validator
      </ReactValidatorMaxlength></div>
      <div><ReactValidatorRequired valid>
        Custom message for required validator
      </ReactValidatorRequired></div>
    </div>
  ));
