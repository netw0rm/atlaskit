import { storiesOf } from '@kadira/storybook';
import BoldIconComponent from 'ak-icon/glyph/editor/bold';
import reactify from 'akutil-react';
import React from 'react';
import ButtonLinkComponent from '../src/ButtonLink';

const BoldIcon = reactify(BoldIconComponent);
const ButtonLink = reactify(ButtonLinkComponent);

storiesOf('ak-editor-ui ButtonLink', module)
  .add('Empty', () => (
    <ButtonLink />
  ))
  .add('Letter', () => (
    <ButtonLink href="">B</ButtonLink>
  ))
  .add('Icon', () => (
    <ButtonLink href=""><BoldIcon /></ButtonLink>
  ));
