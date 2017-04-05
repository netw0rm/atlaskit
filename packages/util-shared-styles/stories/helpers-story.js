import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@kadira/storybook';
import { Chrome, Code, Description } from '@atlaskit/util-readme';
import { name } from '../package.json';

const H3 = styled.h3`
  &, &:first-child { margin-top: 2em; }
`;

/* eslint-disable import/first, import/no-duplicates */
import FocusRingExample from './examples/helpers/focus-ring';
import FocusRingExampleRaw from '!raw!./examples/helpers/focus-ring';
import TextExample from './examples/helpers/text';
import TextExampleRaw from '!raw!./examples/helpers/text';
/* eslint-enable import/first, import/no-duplicates */

storiesOf(name, module)
  .add('Mixin: Helpers', () => (
    <Chrome>
      <h1>Helpers</h1>
      <Description>
        <H3>Focus Ring</H3>
        <p>The focus ring helper exposes three utilities:</p>
        <ul>
          <li><code>default</code> Constant</li>
          <li><code>none</code> Constant</li>
          <li><code>generate</code> Function</li>
        </ul>
        <p>Below are some possible implementations using the focus ring helper mixin.</p>
      </Description>
      <Code code={FocusRingExampleRaw}>
        {FocusRingExample}
      </Code>

      <Description>
        <H3>Text</H3>
        <p>The text helper exposes one utility:</p>
        <ul>
          <li><code>truncate</code> Function</li>
        </ul>
        <p>Below are some possible implementations using the text helper mixin.</p>
      </Description>
      <Code code={TextExampleRaw}>
        {TextExample}
      </Code>
    </Chrome>
  ));
