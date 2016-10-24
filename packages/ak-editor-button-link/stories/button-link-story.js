import { storiesOf } from '@kadira/storybook';
import EditorBoldIcon from 'ak-icon/glyph/editor/bold';
import reactify from 'akutil-react';
import React from 'react';

import LinkComponent from '../src';


const Link = reactify(LinkComponent);
const Icon = reactify(EditorBoldIcon);

storiesOf('ak-editor-button-link', module)
  .add('Empty', () => (
    <Link /> // eslint-disable-line jsx-a11y/anchor-has-content
  ))
  .add('Letter', () => (
    <Link href="">B</Link>
  ))
  .add('Icon', () => (
    <Link href=""><Icon /></Link>
  ));
