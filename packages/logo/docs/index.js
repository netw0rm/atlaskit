import React from 'react';
import styled from 'styled-components';

/* eslint-disable import/no-duplicates, import/first */
import Example from './Example';
import exampleSrc from '!raw-loader!./Example';
import LogosExample from './LogosExample';
import logosExampleSrc from '!raw-loader!./LogosExample';
/* eslint-enable import/no-duplicates, import/first */

const Usage = styled.pre`
  background-color: #F4F5F7;
  border-radius: 5px;
  margin: 14px 0;
  padding: 8px;
`;

export const description = (
  <div>
    <Usage>
      {`import Logo, {
  AtlassianLogo,
  BitbucketLogo,
  ConfluenceLogo,
  HipchatLogo,
  JiraLogo,
} from @atlaskit/comment`}
    </Usage>
  </div>
);

export const examples = [
  {
    title: 'Options for Logos',
    Component: Example,
    src: exampleSrc,
  },
  {
    title: 'All Logos',
    Component: LogosExample,
    src: logosExampleSrc,
  },
];
