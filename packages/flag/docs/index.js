import React from 'react';
import styled from 'styled-components';
import { borderRadius, colors, gridSize } from '@atlaskit/theme';

/* eslint-disable import/no-duplicates, import/first */
import FlagExample from './FlagExample';
import flagExampleSource from '!raw-loader!./FlagExample';

import FlagBoldExample from './FlagBoldExample';
import flagBoldExampleSource from '!raw-loader!./FlagBoldExample';

import FlagGroupExample from './FlagGroupExample';
import flagGroupExampleSource from '!raw-loader!./FlagGroupExample';
/* eslint-enable import/no-duplicates, import/first */

const CodeBlock = styled.pre`
  background-color: ${colors.codeBlock};
  border-radius: ${borderRadius}px;
  margin: ${gridSize * 2}px 0;
  padding: ${gridSize}px;
`;

export const description = (
  <div>
    <p>
      Flags are designed to place a message above the regular page content.
      The <code>Flag</code> component applies styling, while <code>FlagGroup</code> animates
      the loading and unloading of flags.
    </p>
    <CodeBlock>
      {'import Flag, { FlagGroup } from @atlaskit/flag'}
    </CodeBlock>
  </div>
);

export const examples = [
  {
    title: 'Flag Component',
    Component: FlagExample,
    src: flagExampleSource,
  },
  {
    title: 'Bold Flag Component',
    Component: FlagBoldExample,
    src: flagBoldExampleSource,
  },
  {
    title: 'Flag Group Example',
    Component: FlagGroupExample,
    src: flagGroupExampleSource,
  },
];
