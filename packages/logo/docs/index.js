import React from 'react';
import styled from 'styled-components';

import { colors } from '@atlaskit/theme';

/* eslint-disable import/no-duplicates, import/first */
import Example from './Example';
import exampleSrc from '!raw-loader!./Example';
import AllLogos from './AllLogos';
import allLogosSrc from '!raw-loader!./AllLogos';
/* eslint-enable import/no-duplicates, import/first */

const Usage = styled.pre`
  background-color: ${colors.codeBlock};
  border-radius: 5px;
  margin: 14px 0;
  padding: 8px;
`;

export const description = (
  <div>
    <p>The logo component is used to export Atlassian logos. The default export
    is the atlassian logo, with other logos being exportable as named exports.</p>
    <Usage>{"import DefaultLogo from '@atlaskit/logo'"}</Usage>
    <Usage>{`import {
  AtlassianLogo,
  BitbucketLogo,
  ConfluenceLogo,
  HipchatLogo,
  JiraLogo
} from '@atlaskit/logo'`}</Usage>
    <p>All exported logos share a base, with the same props. Props passed to each logo
    are passed down to the base.</p>
  </div>
);

export const examples = [
  {
    title: 'All Options',
    Component: Example,
    src: exampleSrc,
  },
  {
    title: 'All Logos',
    Component: AllLogos,
    src: allLogosSrc,
  },
];
