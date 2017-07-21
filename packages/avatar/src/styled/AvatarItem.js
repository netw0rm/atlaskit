import styled, { css } from 'styled-components';
import {
  akBorderRadius,

  akColorB50,
  akColorB200,
  akColorN30,
  akColorN100,
  akColorN800,

  akGridSizeUnitless,
} from '@atlaskit/util-shared-styles';

const ThemeColor = {
  backgroundActive: akColorB50,
  backgroundHover: akColorN30,
  borderFocus: akColorB200,
  primaryText: akColorN800,
  secondaryText: akColorN100,
};

const gutter = akGridSizeUnitless / 2;

export function getStyles({ href, isActive, isDisabled, isFocus, isHover, isSelected, onClick }) {
  const isInteractive = href || onClick;

  let backgroundColor = 'transparent';
  let borderColor = 'transparent';
  let cursor = 'auto';
  let opacity = 1;
  let outline = 'none';
  let pointerEvents = 'auto';

  // Interaction: Hover
  if (isInteractive && (isHover || isSelected)) {
    backgroundColor = ThemeColor.backgroundHover;
  }

  // Interaction: Active
  if (isInteractive && isActive) {
    backgroundColor = ThemeColor.backgroundActive;
  }

  // Interaction: Focus
  if (isInteractive && isFocus && !isActive) {
    outline = 'none';
    borderColor = ThemeColor.borderFocus;
  }

  // Disabled
  if (isDisabled) {
    cursor = 'not-allowed';
    opacity = 0.75;
    pointerEvents = 'none';
  }

  // Interactive
  if (isInteractive) {
    cursor = 'pointer';
  }
  return css`
    align-items: center;
    background-color: ${backgroundColor};
    border-radius: ${akBorderRadius};
    border: 2px solid ${borderColor};
    box-sizing: content-box;
    color: inherit;
    cursor: ${cursor};
    display: flex;
    font-size: inherit;
    font-style: normal;
    font-weight: normal;
    line-height: 1;
    opacity: ${opacity};
    outline: ${outline};
    margin: 0;
    padding: ${gutter}px;
    pointer-events: ${pointerEvents};
    text-align: left;
    text-decoration: none;
    width: 100%;
  `;
}

const truncateText = p => p.truncate && css`
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const truncateTextFlexParent = p => p.truncate && css`
  max-width: 100%;
  min-width: 0;
`;

export const Content = styled.div`
  ${truncateTextFlexParent}
  flex: 1;
  line-height: 1.4;
  padding-left: ${gutter * 2}px;
`;
export const PrimaryText = styled.div`
  ${truncateText}
  color: ${ThemeColor.primaryText};
`;
export const SecondaryText = styled.div`
  ${truncateText}
  color: ${ThemeColor.secondaryText};
  font-size: 0.85em;
`;
