// @flow
import styled, { css } from 'styled-components';
import { akBorderRadius, akColorB50, akColorB200, akColorN30A, akColorN100, akGridSizeUnitless } from '@atlaskit/util-shared-styles';

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
    backgroundColor = akColorN30A;
  }

  // Interaction: Active
  if (isInteractive && isActive) {
    backgroundColor = akColorB50;
  }

  // Interaction: Focus
  if (isInteractive && isFocus && !isActive) {
    outline = 'none';
    borderColor = akColorB200;
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
    opacity: ${opacity};
    outline: ${outline};
    padding: ${gutter}px;
    pointer-events: ${pointerEvents};
    text-align: left;
    text-decoration: none;
    width: 100%;
  `;
}

export const Content = styled.div`
  flex: 1;
  padding-left: ${gutter * 2}px;
`;
export const Title = styled.div``;
export const Subtitle = styled.div`
  color: ${akColorN100};
  font-size: 0.85em;
`;
