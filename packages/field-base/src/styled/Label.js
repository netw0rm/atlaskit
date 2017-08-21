import styled, { css } from 'styled-components';
import { akGridSizeUnitless as spacing, akColorR300 } from '@atlaskit/util-shared-styles';
import theme from './theme';

const fontSize = 12;
const innerHeight = spacing * 2; // 16px
const lineHeight = innerHeight / fontSize;

const getPadding = ({ firstChild, inlineEdit }) => {
  const right = 0;
  let bottom = spacing / 2;
  let left = 0;
  let top = spacing * 2.5;

  if (inlineEdit) {
    bottom = 0;
    left = spacing;
    top = spacing;
  }
  if (firstChild) {
    top = spacing / 2;
  }

  return css`padding: ${top}px ${right}px ${bottom}px ${left}px`;
};

export const LabelWrapper = styled.label`
  display: block;
`;

export const LabelInner = styled.div`
  color: ${theme.label.color};
  font-size: ${fontSize}px;
  font-weight: 600;
  line-height: ${lineHeight}
  ${getPadding}

  ${p => (p.isHidden && 'display: none;')}
`;

export const RequiredIndicator = styled.span`
  color: ${akColorR300};
  padding-left: 2px;
`;
