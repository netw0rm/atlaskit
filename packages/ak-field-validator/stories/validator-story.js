/* eslint-disable jsx-a11y/href-no-hash */
import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import React from 'react';
import { define } from 'skatejs';
import {
  ValidatorBase,
  ValidatorMinlength,
  ValidatorMaxlength,
  ValidatorRequired,
} from '../src';

const ReactValidatorMinlength = reactify(ValidatorMinlength);
const ReactValidatorMaxlength = reactify(ValidatorMaxlength);
const ReactValidatorRequired = reactify(ValidatorRequired);

// Custom validator
const ValidatorStartsWith = define('x-validator-starts-with', class extends ValidatorBase {
  static get props() {
    return Object.assign(super.props, {
      start: {
        attribute: true,
        default: '',
      },
    });
  }
  validatorFunction(value) {
    return value.startsWith(this.start);
  }
});
const ReactValidatorStartsWith = reactify(ValidatorStartsWith);


storiesOf(name, module)
  .add('pre-defined validators (invalid)', () => (
    <div>
      <div><ReactValidatorMinlength minlength="10" invalid>
        Custom message for <b>minlength</b> validator
      </ReactValidatorMinlength></div>
      <div><ReactValidatorMaxlength maxlength="10" invalid>
        Custom message for <b>maxlength</b> validator
      </ReactValidatorMaxlength></div>
      <div><ReactValidatorRequired invalid>
        Custom message for <b>required</b> validator and a <a href="#">link</a>
      </ReactValidatorRequired></div>
    </div>
  ))
  .add('pre-defined validators (valid))', () => (
    <div>
      <div><ReactValidatorMinlength minlength="10">
        Custom message for <b>minlength</b> validator
      </ReactValidatorMinlength></div>
      <div><ReactValidatorMaxlength maxlength="10">
        Custom message for <b>maxlength</b> validator
      </ReactValidatorMaxlength></div>
      <div><ReactValidatorRequired>
        Custom message for <b>required</b> validator and a <a href="#">link</a>
      </ReactValidatorRequired></div>
    </div>
  ))
  .add('custom validator', () => (
    <div>
      <ReactValidatorStartsWith start="foo" invalid>
        Error message for my <b>custom validator</b>
      </ReactValidatorStartsWith>
    </div>
  ));
