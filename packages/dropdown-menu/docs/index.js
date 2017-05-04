import React from 'react';
import styled from 'styled-components';

/* eslint-disable import/no-duplicates, import/first */
import DefaultDropdownExample from './DefaultDropdownExample';
import defaultDropdownExampleSrc from '!raw-loader!./DefaultDropdownExample';
import StatelessDropdownExample from './StatelessDropdownExample';
import statelessDropdownExampleSrc from '!raw-loader!./StatelessDropdownExample';
import ComplexDropdownExample from './ComplexDropdownExample';
import complexDropdownExampleSrc from '!raw-loader!./ComplexDropdownExample';
/* eslint-enable import/no-duplicates, import/first */

const Usage = styled.pre`
  background-color: #F4F5F7;
  border-radius: 5px;
  margin: 14px 0;
  padding: 8px;
`;

export const description = (
  <div>
    <p>
      The dropdown menu has two exports, a default usage for most situations,
      and a stateless component when you want to have more direct control over
      all actions, such as whether to select an item immediately on click.
      The default usage works to handle selection for you, while still providing
      several functions that allow you to retrieve information from a form, most
      notably <code>onItemActivated</code>, which returns an item when it is clicked on.
    </p>
    <Usage>
      {'import DropdownMenu, { StatelessDropdownMenu} from @atlaskit/dropdown-menu'}
    </Usage>
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
