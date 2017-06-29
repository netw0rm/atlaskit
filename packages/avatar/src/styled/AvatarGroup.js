// @flow
import styled from 'styled-components';
import { akGridSize, akGridSizeUnitless } from '@atlaskit/util-shared-styles';

const gutter = `${akGridSizeUnitless / 2}px`;

export const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  line-height: 1;
  justify-content: flex-start;
  margin-left: -${gutter};
  margin-right: -${gutter};

  > * {
    margin-bottom: ${akGridSize};
    padding-left: ${gutter};
    padding-right: ${gutter};
  }
`;

export const Stack = styled.div`
  display: flex;
  line-height: 1;

  > * {
    margin-right: -${gutter};
  }
`;
