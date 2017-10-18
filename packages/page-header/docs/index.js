import React from 'react';
import styled from 'styled-components';
import { borderRadius, colors, gridSize, math, themed } from '@atlaskit/theme';

/* eslint-disable import/no-duplicates, import/first */
import SimpleHeaderExample from './SimpleHeaderExample';
import simpleHeaderExampleSrc from '!raw-loader!./SimpleHeaderExample';
import RichHeaderExample from './RichHeaderExample';
import richHeaderExampleSrc from '!raw-loader!./RichHeaderExample';
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
    <h3>Usage</h3>
    <p>
      This package exports an <code>PageHeader</code> component:
    </p>
    <Pre>{"import PageHeader from '@atlaskit/page-header';"}</Pre>
    <p>
      Use the <code>PageHeader</code> component to apply proper spacing between different header
      elements.
    </p>
  </div>
);

export const examples = [
  {
    title: 'Plain Page Header',
    Component: SimpleHeaderExample,
    src: simpleHeaderExampleSrc,
  },
  {
    title: 'Rich Page Header',
    Component: RichHeaderExample,
    src: richHeaderExampleSrc,
  },
];
