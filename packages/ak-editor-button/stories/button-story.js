import { storiesOf } from '@kadira/storybook';
import ButtonComponent from '../src';
import IconComponent from 'ak-editor-icon';
import reactify from 'akutil-react';
import { define, vdom } from 'skatejs'; // eslint-disable-line no-unused-vars
const { React, ReactDOM } = window;

const Button = reactify(ButtonComponent, { React, ReactDOM });
const Icon = reactify(IconComponent, { React, ReactDOM });

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
    <Button><Icon glyph="bold" /></Button>
  ))
  .add('Icon (active)', () => (
    <Button active><Icon glyph="bold" fill="white" /></Button>
  ))
  .add('Icon (disabled)', () => (
    <Button disabled><Icon glyph="bold" /></Button>
  ))
  .add('Icon (active + disabled)', () => (
    <Button active disabled><Icon glyph="bold" fill="white" /></Button>
  ));
