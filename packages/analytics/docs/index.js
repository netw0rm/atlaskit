import React from 'react';
import styled from 'styled-components';

/* eslint-disable import/no-duplicates, import/first */
import Example from './Example';
import exampleSrc from '!raw-loader!./Example';
/* eslint-enable import/no-duplicates, import/first */

const Usage = styled.pre`
  background-color: #f4f5f7;
  border-radius: 5px;
  margin: 14px 0;
  padding: 8px;
`;

export const description = (
  <div>
    <p>
      Use the analytics library to fire analytics events for components, and to
      decorate and received events fired by components.
    </p>
    <Usage>{`import {
  AnalyticsDecorator, AnalyticsListener, cleanProps, withAnalytics
} from '@atlaskit/analytics'`}</Usage>
    <p>
      Documentation is a work in progress — see stories and tests for usage
      examples.
    </p>
  </div>
);

export const examples = [
  {
    title: 'Basic Example',
    Component: Example,
    src: exampleSrc,
  },
];
