import styled, { css } from 'styled-components';
import { akColorN500 } from '@atlaskit/util-shared-styles';

const ThemeColor = {
  text: akColorN500,
};

const common = ({ hasAuthor }) => css`
  &:not(:hover):not(:active) {
    color: ${ThemeColor.text};
  }
  font-weight: ${hasAuthor ? 500 : 'inherit'};
`;

const Anchor = styled.a`${p => common(p)}`;
const Span = styled.span`${p => common(p)}`;

export {
  Anchor,
  Span,
};
