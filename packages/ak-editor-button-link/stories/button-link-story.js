import { storiesOf } from '@kadira/storybook';
import LinkComponent from '../src';
import IconComponent from 'ak-editor-icon';
import reactify from 'akutil-react';
import React from 'react';

const Link = reactify(LinkComponent);
const Icon = reactify(IconComponent);

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
