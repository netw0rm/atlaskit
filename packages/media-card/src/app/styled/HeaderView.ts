/* tslint:disable:variable-name */
import styled from 'styled-components';
import {akGridSizeUnitless, akColorN0, akColorN900} from '@atlaskit/util-shared-styles';
import {center, ellipsis} from '../../styles';

export interface WrapperProps {
  contentMaxWidth: number;
}

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  max-width: ${({contentMaxWidth}: WrapperProps) => contentMaxWidth}px;
  height: 18px;
  padding: ${akGridSizeUnitless * 2}px;
`;

export const User = styled.div`
  display: flex;
  margin-right: ${akGridSizeUnitless / 2}px;
`;

export interface TitleProps {
  isInversed?: boolean;
}

export const Title = styled.div` /* FIXME: should we use a more semantic and better accessible element type */
  flex: 1;
  color: ${({isInversed}: TitleProps) => isInversed ? akColorN0 : akColorN900};
  font-size: 14px;
  font-weight: 500;
  ${ellipsis()}
`;

export interface CollapseToggleProps {
  isCollapsed?: boolean;
}

export const CollapseButton = styled.div`
  ${center}
  cursor: pointer;
  transition: transform 0.5s;
  ${({isCollapsed}: CollapseToggleProps) => (isCollapsed ? '' : 'transform: rotate(180deg);')}
`;
