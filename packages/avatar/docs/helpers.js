import React from 'react';
import styled from 'styled-components';
import { colors, math, gridSize } from '@atlaskit/theme';

export const VerticalRhythm = styled.div`
  & + & {
    margin-top: 1em;
  }
`;
export const Wrapper = styled(VerticalRhythm)`
  align-items: baseline;
  display: flex;
`;
export const Gap = styled.span`
  margin-Right: ${gridSize}px;
`;
export const Dot = styled(Gap)`
  height: ${math.multiply(gridSize, 3)}px;
  width: ${math.multiply(gridSize, 3)}px;
`;
export const Heading = styled.div`
  color: ${colors.subtleHeading};
  display: flex;
  font-size: 0.8rem;
  font-weight: 500;
  margin-bottom: 0.5em;
  text-transform: uppercase;
`;

export const Block = ({ children, heading }) => (heading ? (
  <VerticalRhythm>
    <Heading>{heading}</Heading>
    <Wrapper>{children}</Wrapper>
  </VerticalRhythm>
) : (
  <Wrapper>
    {children}
  </Wrapper>
));
