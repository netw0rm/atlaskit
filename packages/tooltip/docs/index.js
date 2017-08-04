import React from 'react';
import styled from 'styled-components';
import { borderRadius, colors, gridSize, math, themed } from '../../theme/src';

/* eslint-disable import/no-duplicates, import/first */
import Example from './Example';
import exampleSrc from '!raw-loader!./Example';
import StatelessExample from './StatelessExample';
import statelessExampleSrc from '!raw-loader!./StatelessExample';
/* eslint-enable import/no-duplicates, import/first */

const Pre = styled.pre`
  background-color: ${themed({ light: colors.N20, dark: colors.DN50 })};
  border-radius: ${borderRadius}px;
  box-sizing: border-box;
  font-family: Monaco, Menlo, monospace;
  font-size: 0.9em;
  margin: ${math.multiply(gridSize, 2)}px 0;
  overflow-x: auto;
  padding: ${gridSize}px;
`;

export const description = (
  <div>
    <p>
      The tooltip component exports a default stateful component, and a stateless
      named export.
    </p>
    <Pre>
      {"import ToolTip, { TooltipStateless } from '@atlaskit/tooltip'"}
    </Pre>
    <p>
      The stateful component displays the tooltip automatically on mouseover.
    </p>
  </div>
);

export const examples = [
  {
    title: 'Basic Example',
    Component: Example,
    src: exampleSrc,
  },
  {
    title: 'Stateless Example',
    Component: StatelessExample,
    src: statelessExampleSrc,
  },
];
