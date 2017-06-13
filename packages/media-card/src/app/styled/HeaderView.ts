/* tslint:disable:variable-name */
import styled from 'styled-components';
import {akColorN0, akColorN900} from '@atlaskit/util-shared-styles';
import {center} from '../../styles';

export interface WrapperProps {
  contentMaxWidth: number;
}

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  max-width: ${({contentMaxWidth}: WrapperProps) => contentMaxWidth}px;
  height: 18px;
  padding: 16px;
`;

export const User = styled.div`
  display: flex;
  margin-right: 8px;
`;

export interface TitleProps {
  inverse?: boolean;
}

export const Title = styled.div` /* FIXME: should we use a more semantic and better accessible element type */
  flex: 1;
  color: ${({inverse}: TitleProps) => inverse ? akColorN0 : akColorN900};
  font-size: 14px;
  font-weight: 500;

  /* ellipsis */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export interface CollapseToggleProps {
  collapsed?: boolean;
}

export const CollapseButton = styled.div`
  ${center}
  cursor: pointer;
  transition: transform 0.5s;
  ${({collapsed}: CollapseToggleProps) => (collapsed ? '' : 'transform: rotate(180deg);')}
`;
