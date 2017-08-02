// @flow
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Btn from '@atlaskit/button';
import Lozenge from '@atlaskit/lozenge';

import { colors, gridSize, math, themed } from '../../../../theme/src';

import Changelog from '../../components/Changelog';

const LatestChange = (
  { changelog, componentKey }:
  { changelog: Array<{ version: string }>, componentKey: string }
) => {
  if (!changelog || !changelog[0] || !changelog[0].version) return null;

  return (
    <LogWrapper>
      <Latest />
      <Changelog
        changelog={changelog}
        range={changelog[0].version}
        packageName={componentKey}
      />
      <Button component={Link} to={`/changelog/${componentKey}`}>
        Changelog
      </Button>
    </LogWrapper>
  );
};

const LogWrapper = styled.div`
  border-bottom: 2px solid ${themed({ light: colors.N30, dark: colors.DN60 })};
  border-top: 2px solid ${themed({ light: colors.N30, dark: colors.DN60 })};
  margin-bottom: 2em;
  padding-bottom: ${math.multiply(gridSize, 3)}px;
  padding-top: ${math.multiply(gridSize, 3)}px;
  position: relative;

  h2 {
    font-size: 18px;
    font-weight: 500;
  }
  ul {
    padding-left: ${math.multiply(gridSize, 4)}px;

    &:last-child {
      margin-bottom: 0;
    }
  }
  p {
    display: none;
  }
`;
const Button = styled(Btn)`
  position: absolute;
  right: 0;
  top: ${math.multiply(gridSize, 3)}px;
`;
const Latest = (
  { children, ...rest }:
  { children: Element | Node | string }
) => (
  <span style={{ position: 'relative', top: -3 }}>
    <Lozenge appearance="new" {...rest}>
      {children || 'Latest'}
    </Lozenge>
  </span>
);

export default LatestChange;
