import styled from 'styled-components';

import { gridSize, colors, math } from '@atlaskit/theme';

export const Heading = styled.h1`
  font-size: ${math.multiply(gridSize, 4)}px;
  font-weight: 500;

  /* override css reset */
  &,
  &:first-child {
    margin-top: 1em;
  }
  @media (min-width: 600px) {
    &,
    &:first-child {
      margin-top: ${math.multiply(gridSize, 6)}px;
    }
  }
`;

export const Intro = styled.p`
  color: ${colors.heading};
  font-size: ${math.multiply(gridSize, 2)}px;
  font-weight: 300;
  line-height: 1.4em;
`;

export const Section = styled.section`
  margin-top: 3em;

  p {
    line-height: 1.4em;
  }
`;
