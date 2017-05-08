import React from 'react';
import styled from 'styled-components';

/* eslint-disable import/no-duplicates, import/first */
import Example from './Example';
import exampleSrc from '!raw-loader!./Example';
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
      The page component exports a <code>Page</code> component, as well as
      a <code>Grid</code> component and a <code>GridColumn</code> componet.
    </p>
    <Usage>
      {"import Page, { Grid, GridColumn } from '@atlaskit/page'"}
    </Usage>
    <p>
      A <code>Page component </code>
    </p>
  </div>
);

export const examples = [
  {
    title: 'Basic Usage',
    Component: Example,
    src: exampleSrc,
  },
];
