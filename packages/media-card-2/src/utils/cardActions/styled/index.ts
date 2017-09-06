/* tslint:disable:variable-name */
import styled from 'styled-components';
import {akGridSizeUnitless} from '@atlaskit/util-shared-styles';

export const Wrapper = styled.div`
  display: inline-flex;
  position: relative;
  vertical-align: middle;
  font-size: 14px;

  & > * + * {
    margin-left: ${akGridSizeUnitless / 2}px;
  }

`;
