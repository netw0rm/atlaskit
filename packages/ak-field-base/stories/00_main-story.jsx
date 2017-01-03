import React from 'react';
import { storiesOf } from '@kadira/storybook';
import uid from 'uid';
import Input from 'ak-input';
import Button from 'ak-button';
import Avatar from 'ak-avatar';
import ErrorIcon from 'ak-icon/glyph/error';
import HelpIcon from 'ak-icon/glyph/help';
import ExpandIcon from 'ak-icon/glyph/expand';
import FieldBaseExample from './FieldBaseExample';
import { name } from '../package.json';
import AkFieldBase, { Label } from '../src';
import { compact, none, subtle } from '../src/internal/appearances';

const formStyle = {
  padding: '20px',
  backgroundColor: 'white',
  width: '500px',
  display: 'flex',
  flexDirection: 'column',
};

storiesOf(name, module)
  .add('with label', () =>
    <FieldBaseExample
      label="basic example"
      id="fieldbase"
    >
      <Input
        value="input children"
        isEditing
        id="fieldbase"
      />
    </FieldBaseExample>
  )
  .add('without label', () => (
    <FieldBaseExample
      label="No label example"
      isLabelHidden
      id="fieldbase"
    >
      <Input
        value="input children"
        isEditing
        id="fieldbase"
      />
    </FieldBaseExample>
  ))
  .add('with invalid prop', () =>
    <FieldBaseExample
      label="Invalid example"
      id="fieldbase"
      isInvalid
    >
      <Input
        value="input children"
        isEditing
        id="fieldbase"
      />
    </FieldBaseExample>
  )
  .add('with required prop', () =>
    <form style={formStyle}>
      <FieldBaseExample
        label="Required example"
        id="fieldbase"
        isRequired
      >
        <Input
          isEditing
          id="fieldbase"
          required
        />
      </FieldBaseExample>
      <div style={{ padding: 20, paddingTop: 0 }}>
        <button type="submit">submit</button>
      </div>
    </form>
  )
  .add('with disabled prop', () =>
    <FieldBaseExample
      label="Disabled example"
      id="fieldbase"
      isDisabled
    >
      <Input
        id="fieldbase"
        value="input children"
      />
    </FieldBaseExample>
  )
  .add('with readOnly prop', () =>
    <FieldBaseExample
      label="Read Only example"
      id="fieldbase"
      isReadOnly
    >
      <Input
        id="fieldbase"
        value="input children"
      />
    </FieldBaseExample>
  )
  .add('with different appearances', () =>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {
        [
          compact,
          subtle,
          none,
        ].map((appearance) => {
          const id = uid();
          return (
            <FieldBaseExample
              label={`${appearance} appearance example`}
              id={id}
              appearance={appearance}
            >
              <Input
                id={id}
                isEditing
                value="input children"
              />
            </FieldBaseExample>
          );
        })
      }
    </div>
  )
  .add('with button + no padding', () =>
    <div style={{ display: 'inline-block', padding: 20 }}>
      <Label label="Button with no padding example">
        <div style={{ backgroundColor: 'white' }}>
          <AkFieldBase
            isPaddingDisabled
          >
            <Button
              iconAfter={<ExpandIcon />}
            >
              Imagine a Dropdown
            </Button>
          </AkFieldBase>
        </div>
      </Label>
    </div>
  )
  .add('with avatar + text', () => (
    <div
      style={{
        padding: '20px',
        backgroundColor: 'white',
        display: 'inline-block',
      }}
    >
      <Label
        label="Avatar example"
      >
        <div style={{ backgroundColor: 'white' }}>
          <AkFieldBase>
            <Avatar
              src="https://cdn-img.fimfiction.net/user/xb2v-1431833233-195398-64"
              size="small"
            />
            <span style={{ marginLeft: 8 }}>Jack Sparrow</span>
          </AkFieldBase>
        </div>
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
        <Label label="Lots of text (with whitespace)">
          <AkFieldBase>
            <div>{longTextWithSpaces}</div>
          </AkFieldBase>
        </Label>
        <Label label="Lots of text (no whitespace)">
          <AkFieldBase>
            <div style={{ overflow: 'hidden' }}>
              {longTextNoSpaces}
            </div>
          </AkFieldBase>
        </Label>
        <Label label="Small non-textual content (5x5 div)">
          <AkFieldBase>
            <div><div style={smallBoxStyles} /></div>
          </AkFieldBase>
        </Label>
        <div style={{ display: 'inline-flex' }}>
          <Label label="With a max-width">
            <AkFieldBase>
              <Input
                isEditing
                value="a children input"
                style={{ maxWidth: '200em' }}
              />
            </AkFieldBase>
          </Label>
        </div>
      </div>
    );
  })
  .add('with elements on the right', () => (
    <div style={formStyle}>
      {
        [
          <Button appearance="subtle">Cancel</Button>,
          <Button iconBefore={<HelpIcon />} />,
          <div style={{ color: '#bf2600' }}><ErrorIcon /></div>,
          'important',
        ].map((rightGutter) => {
          const id = uid();
          return (
            <div>
              <Label
                label="Avatar example"
                htmlFor={id}
              />
              <div style={{ backgroundColor: 'white', display: 'inline-flex', alignItems: 'center' }}>
                <AkFieldBase>
                  <Input id={id} value="Input children" isEditing />
                </AkFieldBase>
                <div style={{ marginLeft: 4 }}>
                  {rightGutter}
                </div>
              </div>
            </div>
          );
        })
      }
    </div>
  ));
