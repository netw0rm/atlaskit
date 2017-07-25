import React from 'react';
import styled from 'styled-components';

/* eslint-disable import/no-duplicates, import/first */
import FlagExample from './FlagExample';
import flagExampleSource from '!raw-loader!./FlagExample';

import FlagBoldExample from './FlagBoldExample';
import flagBoldExampleSource from '!raw-loader!./FlagBoldExample';

import FlagGroupExample from './FlagGroupExample';
import flagGroupExampleSource from '!raw-loader!./FlagGroupExample';
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
      Flags are designed to place a message above the regular page content.
      The <code>Flag</code> component applies styling, while <code>FlagGroup</code> animates
      the loading and unloading of flags.
    </p>
    <Usage>
      {'import Flag, { FlagGroup } from @atlaskit/flag'}
    </Usage>
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
