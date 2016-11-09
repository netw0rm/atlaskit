import { storiesOf } from '@kadira/storybook';
import React from 'react';
import reactify from 'akutil-react';
import { ValidatorMinlength, ValidatorMaxlength } from 'ak-field-validator';

import { name } from '../package.json';
import FieldBaseWC from '../src';
import { InputFieldBase, DivFieldBase } from './shared-components';


const FieldBase = reactify(FieldBaseWC);
const ReactValidatorMin = reactify(ValidatorMinlength);
const ReactValidatorMax = reactify(ValidatorMaxlength);

const formStyle = {
  padding: '20px',
  backgroundColor: 'white',
  width: '500px',
};

storiesOf(name, module)
  .add('a simple ak-field-base', () => (
    <div>
      <form action="" style={formStyle}>
        <div>
          <p>
            This shows the base functionality provided by ak-field-base.
          </p>
          <ul>
            <li>label (any string)</li>
            <li>hideLabel (true or false)</li>
            <li>invalid (true or false)</li>
          </ul>
        </div>
        <DivFieldBase label="Slotted div" />
        <InputFieldBase label="Slotted input" />
      </form>
    </div>
  ))
  .add('field-base states', () => (
    <div>
      <form action="" style={formStyle}>
        <InputFieldBase label="A default field-base" />
        <InputFieldBase label="Invalid state" invalid />
        <InputFieldBase label="Focused state" focused />
        <InputFieldBase label="Focused state (using override)" override={{ focused: true }} />
        <InputFieldBase label="Required state" required />
        <InputFieldBase label="Disabled state" disabled />
        <InputFieldBase label="Compact state" appearance="compact" />
        <InputFieldBase label="Subtle state" appearance="subtle" />
      </form>
    </div>
  ))
  .add('fieldbase with different content', () => {
    const longTextWithSpaces = `According to all known laws of aviation, there is no way a bee
      should be able to fly. Its wings are too small to get its fat little body off the ground.
      The bee, of course, flies anyway because bees don't care what humans think is impossible.`;
    const longTextNoSpaces = '3.1415926535897932384626433832795028841971693993751058209749445923' +
      '07816406286208998628034825342117067982148086513282306647093844609550582231725359408128481' +
      '11745028410270193852110555964462294895493038196442881097566593344612847564';
    const smallBoxStyles = {
      height: '5px',
      width: '5px',
      border: '1px solid',
      boxSizing: 'border-box',
    };
    return (
      <div>
        <form action="" style={formStyle}>
          <h2>My Form</h2>
          <div>These example all use divs with different kinds of content (no inputs)</div>

          <DivFieldBase text={longTextWithSpaces} label="Lots of text (with whitespace)" />
          <DivFieldBase text={longTextNoSpaces} label="Lots of text (no whitespace)" />
          <DivFieldBase text={''} label="No content" />

          <FieldBase label="Small non-textual content (5x5 div)">
            <div is slot="input-slot"><div style={smallBoxStyles} /></div>
          </FieldBase>
          <InputFieldBase
            label="With a max-width css style"
            style={{ maxWidth: '200em' }}
          />
        </form>
      </div>
    );
  })
  .add('fieldbase with the label hidden', () => (
    <div>
      <form action="" style={formStyle}>
        <h2>My Label-less Form</h2>
        <InputFieldBase label="Slotted input" hideLabel text="A slotted input with no label" />
      </form>
    </div>
  ))
  .add('fieldbase with validator', () => (
    <div>
      <form action="" style={formStyle}>
        <div>
          <p>This ak-field-base must be 3 - 10 characters long.</p>
        </div>
        <InputFieldBase
          label="Slotted input"
          text=""
        >
          <ReactValidatorMin minlength="3" slot="validator-slot">
            Must have at least 3 characters
          </ReactValidatorMin>
          <ReactValidatorMin minlength="5" slot="validator-slot">
            Must have at least 5 characters
          </ReactValidatorMin>
          <ReactValidatorMax maxlength="10" slot="validator-slot">
            Must have at most 10 characters
          </ReactValidatorMax>
        </InputFieldBase>
      </form>
    </div>
  ));
