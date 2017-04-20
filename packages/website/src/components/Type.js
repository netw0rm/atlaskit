import React from 'react';
import styled from 'styled-components';
import { akGridSizeUnitless, akColorN80 } from '@atlaskit/util-shared-styles';

export const Heading = props => <StyledHeading {...props} />;
export const Intro = props => <StyledIntro {...props} />;
export const Section = props => <StyledSection {...props} />;

const StyledHeading = styled.h1`
  font-size: ${akGridSizeUnitless * 4}px;
  font-weight: 500;

  /* override css reset */
  &, &:first-child {
    margin-top: ${akGridSizeUnitless * 6}px;
  }
`;
const StyledIntro = styled.p`
  color: ${akColorN80};
  font-size: ${akGridSizeUnitless * 2}px;
  font-weight: 300;
  line-height: 1.4em;
`;

const StyledSection = styled.section`
  margin-top: 3em;

  p {
    line-height: 1.8em;
  }
`;
