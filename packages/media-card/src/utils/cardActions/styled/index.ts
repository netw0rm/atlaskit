/* tslint:disable:variable-name */
import styled from 'styled-components';
import {Root} from '../../../styles';
import {akGridSizeUnitless} from '@atlaskit/util-shared-styles';

export const Wrapper = styled(Root)`
  display: inline-flex;
  position: relative;
  vertical-align: middle;
  font-size: 14px;

  & > * + * {
    margin-left: ${akGridSizeUnitless / 2}px;
  }

`;
