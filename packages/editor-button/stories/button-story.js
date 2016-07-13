import { storiesOf } from '@kadira/storybook';
import ButtonComponent from '../src/index';
import IconBoldComponent from 'editor-icons/dist/bold';
import reactify from 'akutil-react';
import { define, vdom } from 'skatejs'; // eslint-disable-line no-unused-vars
const { React, ReactDOM } = window;

const Button = reactify(ButtonComponent, { React, ReactDOM, });
const IconBold = reactify(IconBoldComponent, { React, ReactDOM, });

storiesOf('editor-button', module)
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
    <Button><IconBold /></Button>
  ))
  .add('Icon (active)', () => (
    <Button active><IconBold /></Button>
  ))
  .add('Icon (disabled)', () => (
    <Button disabled><IconBold /></Button>
  ))
  .add('Icon (active + disabled)', () => (
    <Button active disabled><IconBold /></Button>
  ));
