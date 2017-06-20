/* tslint:disable:variable-name */
import styled, {css} from 'styled-components';
import {akGridSizeUnitless, akColorN0, akColorN300} from '@atlaskit/util-shared-styles';
import {size} from '../../styles';

export const Wrapper = styled.div`

  /* TODO: use mixin to vertically center items */
  display: flex;
  align-items: center;

  flex-grow: 1;

`;

export const IconImage = styled.img`
  margin-right: ${akGridSizeUnitless}px;
  ${size(akGridSizeUnitless * 3)};
`;

export interface TextProps {
  isInversed?: boolean;
}

const textStyles = css`
  color: ${({isInversed}: TextProps) => isInversed ? akColorN0 : akColorN300};
`;

export const Text = styled.span`
  ${textStyles}
`;

export const LinkText = styled.a`
  ${textStyles}
`;
