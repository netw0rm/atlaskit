import React from 'react';
import styled from 'styled-components';
import { borderRadius, colors, gridSize, math } from '../../theme/src';

/* eslint-disable import/no-duplicates, import/first */
import Example from './Example';
import exampleSrc from '!raw-loader!./Example';
import StatelessExample from './StatelessExample';
import statelessExampleSrc from '!raw-loader!./StatelessExample';
/* eslint-enable import/no-duplicates, import/first */

const Pre = styled.pre`
  background-color: ${colors.codeBlock};
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
    <Pre>
      {"import Tabs, { TabsStateless } from '@atlaskit/tabs'"}
    </Pre>
    <p>
      Tabs are a way to create navigation within a page, setting content to be
      displayed of each of a list of items, with logic around the switching of
      the content provided for you.
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
    title: 'Stateless Component Example',
    Component: StatelessExample,
    src: statelessExampleSrc,
  },
];
