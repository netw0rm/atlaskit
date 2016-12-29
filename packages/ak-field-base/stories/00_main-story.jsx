import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Button from 'ak-button';
import Avatar from 'ak-avatar';
import ErrorIcon from 'ak-icon/glyph/error';
import HelpIcon from 'ak-icon/glyph/help';
import ExpandIcon from 'ak-icon/glyph/expand';

import { name } from '../package.json';
import AkFieldBase, { Label } from '../src';
import { InputFieldBase, DivFieldBase } from './shared-components';
import { compact, none, subtle } from '../src/internal/appearances';

const formStyle = {
  padding: '20px',
  backgroundColor: 'white',
  width: '500px',
  display: 'flex',
  flexDirection: 'column',
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
      <InputFieldBase label="Read-only state" isReadOnly />
      <InputFieldBase label="Compact state" appearance={compact} />
      <InputFieldBase label="None (no appearance modifiers) state" appearance={none} />
      <InputFieldBase label="Subtle state" appearance={subtle} />
    </div>
  ))
  .add('with button + no padding', () => (
    <div
      style={{
        padding: '20px',
        backgroundColor: 'white',
        display: 'inline-block',
      }}
    >
      <Label label="Label for FieldBase">
        <AkFieldBase
          isPaddingDisabled
        >
          <Button
            iconAfter={<ExpandIcon />}
          >
            Imagine a Dropdown
          </Button>
        </AkFieldBase>
      </Label>
    </div>
  ))
  .add('with avatar + text', () => (
    <div
      style={{
        padding: '20px',
        backgroundColor: 'white',
        display: 'inline-block',
      }}
    >
      <Label label="Label for FieldBase">
        <AkFieldBase>
          <Avatar
            src="https://cdn-img.fimfiction.net/user/xb2v-1431833233-195398-64"
            size="small"
          />
          <span style={{ marginLeft: 8 }}>Jack Sparrow</span>
        </AkFieldBase>
      </Label>
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
        <DivFieldBase text={longTextNoSpaces} label="Lots of text (no whitespace)" isFitContainerWidthEnabled />
        <DivFieldBase text={''} label="No content" />

        <Label label="Small non-textual content (5x5 div)">
          <AkFieldBase>
            <div><div style={smallBoxStyles} /></div>
          </AkFieldBase>
        </Label>
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
        text="Banana Banana Banana Banana Banana Banana Banana Banana Banana Banana"
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
  ))
  .add('with appearance="none"', () => (
    <div style={formStyle}>
      <p>Different form states combined with appearance=none</p>
      <InputFieldBase appearance={none} label="A default field-base" />
      <InputFieldBase appearance={none} label="Invalid state" isInvalid />
      <InputFieldBase appearance={none} label="Focused state" isFocused />
      <InputFieldBase appearance={none} label="Required state" isRequired />
      <InputFieldBase appearance={none} label="Disabled state" isDisabled />
      <InputFieldBase appearance={none} label="Read-only state" isReadOnly />
    </div>
  ));
