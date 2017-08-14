// @flow
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Btn from '@atlaskit/button';
import Lozenge from '@atlaskit/lozenge';
import { akColorN30, akGridSizeUnitless } from '@atlaskit/util-shared-styles';

import Changelog from '../../components/Changelog';

const LatestChange = (
  { changelog, componentKey }:
  { changelog: Array<{ md: string, version: string }>, componentKey: string }
) => {
  if (!changelog || !changelog[0].version) return null;
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

// border-left: ${akGridSizeUnitless / 2}px solid ${akColorN30};
// padding: 0 0 0 ${akGridSizeUnitless * 2}px;

const gutter = `${akGridSizeUnitless * 3}px`;

const LogWrapper = styled.div`
  border-bottom: 2px solid ${akColorN30};
  border-top: 2px solid ${akColorN30};
  margin-bottom: 2em;
  padding-bottom: ${gutter};
  padding-top: ${gutter};
  position: relative;

  h2 {
    font-size: 18px;
    font-weight: 500;
  }
  ul {
    padding-left: ${akGridSizeUnitless * 4}px;

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
  top: ${gutter};
`;
const Latest = (
  { children, ...rest }:
  { children?: Element | Node | string }
) => (
  <span style={{ position: 'relative', top: -3 }}>
    <Lozenge appearance="new" {...rest}>
      {children || 'Latest'}
    </Lozenge>
  </span>
);

export default LatestChange;
