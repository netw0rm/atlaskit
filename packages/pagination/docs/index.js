import React from 'react';
import styled from 'styled-components';

/* eslint-disable import/no-duplicates, import/first */
import Example from './Example';
import exampleSrc from '!raw-loader!./Example';
import StatelessExample from './StatelessExample';
import statelessExampleSrc from '!raw-loader!./StatelessExample';
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
      Before Export Example
    </p>
    <Usage>
      {"import Paginate, { Pagination } from '@atlaskit/pagination'"}
    </Usage>
    <p>
        After export example.
    </p>
  </div>
);

export const examples = [
  {
    title: 'Basic Usage',
    Component: Example,
    src: exampleSrc,
  },
  {
    title: 'Basic Usage',
    Component: StatelessExample,
    src: statelessExampleSrc,
  },
];
