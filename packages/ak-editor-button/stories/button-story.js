import { storiesOf } from '@kadira/storybook';
import EditorBoldIcon from 'ak-icon/glyph/editor/bold';
import reactify from 'akutil-react';
import React from 'react';

import ButtonComponent from '../src';

const Button = reactify(ButtonComponent);
const BoldIcon = reactify(EditorBoldIcon);

storiesOf('ak-editor-button', module)
  .add('Empty', () => (
    <Button />
  ))
  .add('Letter', () => (
    <Button>B</Button>
  ))
  .add('Letter (active)', () => (
    <Button active>B</Button>
  ))
  .add('Letter (disabled)', () => (
    <Button disabled>B</Button>
  ))
  .add('Letter (active + disabled)', () => (
    <Button active disabled>B</Button>
  ))
  .add('Icon', () => (
    <Button><BoldIcon /></Button>
  ))
  .add('Icon (active)', () => (
    <Button active><BoldIcon style={{ color: 'white' }} /></Button>
  ))
  .add('Icon (disabled)', () => (
    <Button disabled><BoldIcon /></Button>
  ))
  .add('Icon (active + disabled)', () => (
    <Button active disabled><BoldIcon style={{ color: 'white' }} /></Button>
  ));
