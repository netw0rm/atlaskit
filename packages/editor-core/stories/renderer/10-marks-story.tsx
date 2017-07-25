import { storiesOf } from '@kadira/storybook';

import * as React from 'react';
import { name, version } from '../../package.json';
import { storyDecorator } from '../../src/test-helper';

import {
  Code,
  Em,
  Link,
  Strike,
  Strong,
  Subsup,
  Underline,
} from '../../src/renderer/react/marks';

storiesOf(name, module)
  .addDecorator(storyDecorator(version))
  .add('renderer/marks/em', () => (
    <Em>This is italic</Em>
  ))
  .add('renderer/marks/link', () => (
    <Link href="https://www.atlassian.com">This is a link</Link>
  ))
  .add('renderer/marks/strike', () => (
    <Strike>This is strike-through</Strike>
  ))
  .add('renderer/marks/strong', () => (
    <Strong>This is strong</Strong>
  ))
  .add('renderer/marks/subsup', () => (
    <div>
      <Subsup type="sub">This is sub</Subsup>
      <Subsup type="sup">This is sup</Subsup>
    </div>
  ))
  .add('renderer/marks/underline', () => (
    <Underline>This is underlined</Underline>
  ))
  .add('renderer/marks/code', () => (
    <Code>This is code</Code>
  ))
;
