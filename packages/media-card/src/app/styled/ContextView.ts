/* tslint:disable:variable-name */
import styled, {css} from 'styled-components';
import {akColorN0, akColorN300} from '@atlaskit/util-shared-styles';

export const Wrapper = styled.div`

  /* TODO: use mixin to vertically center items */
  display: flex;
  align-items: center;

  flex-grow: 1;

`;

export const IconImage = styled.img`
  margin-right: 8px;
  width: 24px;
  height: 24px;
`;

export interface TextProps {
  inverse?: boolean;
}

const textStyles = css`
  color: ${({inverse}: TextProps) => inverse ? akColorN0 : akColorN300};
`;

export const Text = styled.span`
  ${textStyles}
`;

export const LinkText = styled.a`
  ${textStyles}
`;
