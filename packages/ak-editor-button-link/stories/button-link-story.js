import { storiesOf } from '@kadira/storybook';
import LinkComponent from '../src';
import IconComponent from 'ak-editor-icon';
import reactify from 'akutil-react';
const { React, ReactDOM } = window;

const Link = reactify(LinkComponent, { React, ReactDOM });
const Icon = reactify(IconComponent, { React, ReactDOM });

storiesOf('ak-editor-button-link', module)
  .add('Empty', () => (
    <Link />
  ))
  .add('Letter', () => (
    <Link href="">B</Link>
  ))
  .add('Icon', () => (
    <Link href=""><Icon glyph="bold" /></Link>
  ));
