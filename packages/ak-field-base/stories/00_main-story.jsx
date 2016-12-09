import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Button from 'ak-button';
import ErrorIcon from 'ak-icon/glyph/error';
import HelpIcon from 'ak-icon/glyph/help';

import { name } from '../package.json';
import AkFieldBase from '../src';
import { InputFieldBase, DivFieldBase } from './shared-components';
import { compact, subtle } from '../src/internal/appearances';

const formStyle = {
  padding: '20px',
  backgroundColor: 'white',
  width: '500px',
};

storiesOf(name, module)
  .add('basic example', () => (
    <div style={formStyle}>
      <DivFieldBase label="Child div" />
      <InputFieldBase label="Child input" />
    </div>
  ))
  .add('with all states', () => (
    <div style={formStyle}>
      <InputFieldBase label="A default field-base" />
      <InputFieldBase label="Invalid state" isInvalid />
      <InputFieldBase label="Focused state" isFocused />
      <InputFieldBase label="Required state" isRequired />
      <InputFieldBase label="Disabled state" isDisabled />
      <DivFieldBase label="Read-only state" isReadOnly />
      <InputFieldBase label="Compact state" appearance={compact} />
      <InputFieldBase label="Subtle state" appearance={subtle} />
    </div>
  ))
  .add('with different content', () => {
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
      <div style={formStyle}>
        <div>These example all use divs with different kinds of content (no inputs)</div>

        <DivFieldBase text={longTextWithSpaces} label="Lots of text (with whitespace)" />
        <DivFieldBase text={longTextNoSpaces} label="Lots of text (no whitespace)" />
        <DivFieldBase text={''} label="No content" />

        <AkFieldBase label="Small non-textual content (5x5 div)">
          <div><div style={smallBoxStyles} /></div>
        </AkFieldBase>
        <InputFieldBase
          label="With a max-width css style"
          style={{ maxWidth: '200em' }}
        />
      </div>
    );
  })
  .add('with the label hidden', () => (
    <div style={formStyle}>
      <InputFieldBase label="Child input" isLabelHidden text="An input child with no label" />
    </div>
  ))
  .add('with elements on the right', () => (
    <div style={formStyle}>
      <InputFieldBase
        label="Button on the right"
        rightGutter={<Button appearance="subtle">Cancel</Button>}
      />
      <InputFieldBase
        label="Button + icon on the right"
        rightGutter={<Button iconBefore={<HelpIcon />} />}
      />
      <InputFieldBase
        label="Icon + custom color on the right"
        rightGutter={<div style={{ color: '#bf2600' }}><ErrorIcon /></div>}
      />
      <InputFieldBase
        label="Text on the right"
        rightGutter="important"
      />
    </div>
  ));
