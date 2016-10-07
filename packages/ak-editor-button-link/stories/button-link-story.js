import { storiesOf } from '@kadira/storybook';
import LinkComponent from '../src';
import EditorBoldIcon from 'ak-icon/glyph/editor/bold';
import reactify from 'akutil-react';
import React from 'react';

const Link = reactify(LinkComponent);
const Icon = reactify(EditorBoldIcon);

storiesOf('ak-editor-button-link', module)
  .add('Empty', () => (
    <Link />
  ))
  .add('Letter', () => (
    <Link href="">B</Link>
  ))
  .add('Icon', () => (
    <Link href=""><Icon /></Link>
  ));
