import React from 'react';
import styled from 'styled-components';
import { borderRadius, colors, gridSize, math, themed } from '@atlaskit/theme';

/* eslint-disable import/no-duplicates, import/first */
import DefaultDropdownExample from './DefaultDropdownExample';
import defaultDropdownExampleSrc from '!raw-loader!./DefaultDropdownExample';
import StatelessDropdownExample from './StatelessDropdownExample';
import statelessDropdownExampleSrc from '!raw-loader!./StatelessDropdownExample';
import ComplexDropdownExample from './ComplexDropdownExample';
import complexDropdownExampleSrc from '!raw-loader!./ComplexDropdownExample';
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
      The dropdown menu has two exports, a default stateful component,
      and a stateless component when you want to have more direct control over
      all actions.
    </p>
    <Pre>
      {'import DropdownMenu, { DropdownMenuStateless } from @atlaskit/dropdown-menu'}
    </Pre>
    <p>
      The stateful component handles selection for you, while
      still providing several functions that allow you to retrieve information
      from a form, most notably <code>onItemActivated</code>, which returns an
      item when it is clicked on.
    </p>
  </div>
);

export const examples = [
  {
    title: 'Default Dropdown Menu',
    Component: DefaultDropdownExample,
    src: defaultDropdownExampleSrc,
  },
  {
    title: 'Complex Dropdown Menu',
    Component: ComplexDropdownExample,
    src: complexDropdownExampleSrc,
  },
  {
    title: 'Stateless Dropdown Menu',
    Component: StatelessDropdownExample,
    src: statelessDropdownExampleSrc,
  },
];
