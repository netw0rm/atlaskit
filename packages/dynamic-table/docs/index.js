import React from 'react';
import styled from 'styled-components';

/* eslint-disable import/no-duplicates, import/first */
import DefaultDynamicTableExample from './DefaultDynamicTableExample';
import defaultDynamicTableExampleSrc from '!raw-loader!./DefaultDynamicTableExample';
import PaginatedDynamicTableExample from './PaginatedDynamicTableExample';
import paginatedDynamicTableExampleSrc from '!raw-loader!./PaginatedDynamicTableExample';
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
      We <i>shall</i> document tables
    </p>
    <Usage>
      {'Totes code examples'}
    </Usage>
  </div>
);

export const examples = [
  {
    title: 'Default Dynamic Table',
    Component: DefaultDynamicTableExample,
    src: defaultDynamicTableExampleSrc,
  },
  {
    title: 'Paginated Dynamic Table',
    Component: PaginatedDynamicTableExample,
    src: paginatedDynamicTableExampleSrc,
  },
];
