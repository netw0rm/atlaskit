import styled, { css } from 'styled-components';
import { akGridSizeUnitless as spacing } from '@atlaskit/util-shared-styles';
import theme from '../theme';

// Outputs the styles for actions separator: mid-dot for non-bold flags, or space for bold flags.
const getDivider = ({ hasDivider, useMidDot }) => css`
  display: ${hasDivider ? 'inline-block' : 'none'};
  content: "${useMidDot ? '\u00B7' : ''}";
  width: ${useMidDot ? (spacing * 2) : spacing}px;
`;

export default styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-top: ${spacing}px;
`;

export const Action = styled.div`
  &::before {
    color: ${theme.normal.text};
    text-align: center;
    vertical-align: middle;

    ${getDivider}
  }
`;
