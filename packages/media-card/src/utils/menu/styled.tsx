/* tslint:disable:variable-name */
import styled from 'styled-components';
import { akColorN500 } from '@atlaskit/util-shared-styles';
import { Root, centerX, borderRadius, size, center } from '@atlaskit/media-ui';

export const Wrapper = styled(Root)`
  display: flex;
  position: relative;
`;

export const MeatballsButton = styled.div`
  ${centerX}
  ${borderRadius}
  float: right;
  width: 36px;
  height: 26px;
  color: ${akColorN500};
  cursor: pointer;

  &:hover {
    background-color: rgba(9, 30, 66, 0.06);
  }

  &.active {
    background-color: white !important;

    span {
      color: #253858;
    }
  }
`;

export const DropdownWrapper = styled.div`;
  display: block;
  position: absolute;
  left: calc(100% - 37px);
  top: 105%;

  z-index: 100;
`;

export const DeleteBtn = styled.div`
  ${center}
  ${borderRadius}
  ${size(26)}
  color: ${akColorN500};

  &:hover {
    cursor: pointer;
    background-color: rgba(9, 30, 66, 0.06);
  }
`;
