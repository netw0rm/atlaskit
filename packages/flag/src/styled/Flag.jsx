import styled from 'styled-components';

import { borderRadius, gridSize, math } from '@atlaskit/theme';

import {
  flagBackgroundColor,
  flagBorderColor,
  flagTextColor,
  flagShadowColor,
  flagFocusRingColor,
} from '../theme';

const getBoxShadow = (props) => {
  const borderColor = flagBorderColor(props);
  const shadowColor = flagShadowColor(props);

  const border = borderColor && `0 0 1px ${borderColor}`;
  const shadow = `0 20px 32px -8px ${shadowColor}`;

  return [border, shadow].filter(p => p).join(',');
};

export default styled.div`
  background-color: ${flagBackgroundColor};
  border-radius: ${borderRadius}px;
  box-sizing: border-box;
  box-shadow: ${getBoxShadow};
  color: ${flagTextColor};
  display: flex;
  padding: ${math.multiply(gridSize, 2)}px;
  transition: background-color 200ms;
  width: 100%;
  z-index: 600;

  &:focus {
    outline: none;
    box-shadow: 0px 0px 0px 2px ${flagFocusRingColor};
  }
`;

// Header
export const Header = styled.div`
  display: flex;
`;

export const Title = styled.span`
  color: ${flagTextColor};
  font-weight: 600;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const DismissButton = styled.button`
  appearance: none;
  background: none;
  border: none;
  border-radius: ${borderRadius}px;
  color: ${flagTextColor};
  cursor: pointer;
  display: flex;
  margin-left: ${gridSize}px;
  padding: 0;
  white-space: nowrap;

  &:focus {
    outline: none;
    box-shadow: 0px 0px 0px 2px ${flagFocusRingColor};
  }
`;

// Content
export const Content = styled.div`
  display: flex;
  flex: 1 1 100%;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
`;

export const Expander = styled.div`
  max-height: ${({ isExpanded }) => (isExpanded ? 150 : 0)}px;
  opacity: ${({ isExpanded }) => (isExpanded ? 1 : 0)};
  overflow: ${({ isExpanded }) => (isExpanded ? 'visible' : 'hidden')};
  transition: max-height 0.3s, opacity 0.3s;
`;

export const Description = styled.div`
  color: ${flagTextColor};
  margin-top: ${gridSize}px;
  word-wrap: break-word;
`;

export const Icon = styled.div`
  align-items: flex-start;
  display: inline-flex;
  flex: 0 0 auto;
  flex-direction: column;
  width: ${math.multiply(gridSize, 4)}px;
`;
