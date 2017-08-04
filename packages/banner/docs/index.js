import React from 'react';
import styled from 'styled-components';
import { borderRadius, colors, gridSize, math, themed } from '../../theme/src';

/* eslint-disable import/no-duplicates, import/first */
import WarningBanner from './WarningBanner';
import warningBannerSrc from '!raw-loader!./WarningBanner';
import ErrorBanner from './ErrorBanner';
import errorBannerSrc from '!raw-loader!./ErrorBanner';
import AnimationExample from './AnimationExample';
import animationExampleSrc from '!raw-loader!./AnimationExample';
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
    <Pre>
      {"import Banner from '@atlaskit/banner';"}
    </Pre>
    <p>
      This banner component is designed to display a prominent message at the
      top of the page. It animates its opening and closing.
    </p>
  </div>
);

export const examples = [
  {
    title: 'Warning Usage',
    Component: WarningBanner,
    src: warningBannerSrc,
  },
  {
    title: 'Error Usage',
    Component: ErrorBanner,
    src: errorBannerSrc,
  },
  {
    title: 'Toggle Banner',
    Component: AnimationExample,
    src: animationExampleSrc,
  },
];
