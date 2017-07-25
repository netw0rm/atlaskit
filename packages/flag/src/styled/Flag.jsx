import styled from 'styled-components';
import {
  akBorderRadius,
  akGridSizeUnitless as spacing,
} from '@atlaskit/util-shared-styles';
import { getProperty } from '../theme';

const getTextColor = props => getProperty('text', props);
const getBoxShadow = props => {
  const borderColor = getProperty('border', props);
  const shadowColor = getProperty('shadow', props);

  const border = borderColor && `0 0 1px ${borderColor}`;
  const shadow = `0 20px 32px -8px ${shadowColor}`;

  return [border, shadow].filter(p => p).join(',');
};

export default styled.div`
  background-color: ${props => getProperty('background', props)};
  border-radius: ${akBorderRadius};
  box-sizing: border-box;
  box-shadow: ${getBoxShadow};
  color: ${getTextColor};
  display: flex;
  padding: ${spacing * 2}px;
  width: 100%;
  z-index: 600;

  &:focus {
    outline: none;
    box-shadow: 0px 0px 0px 2px ${props => getProperty('focusRingColor', props)};
  }
`;

// Header
export const Header = styled.div`
  display: flex;
`;

export const Title = styled.span`
  color: ${getTextColor};
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
  border-radius: ${akBorderRadius};
  color: ${getTextColor};
  cursor: pointer;
  display: flex;
  margin-left: ${spacing}px;
  padding: 0;
  white-space: nowrap;

  &:focus {
    outline: none;
    box-shadow: 0px 0px 0px 2px ${props => getProperty('focusRingColor', props)};
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
  color: ${getTextColor};
  margin-top: ${spacing}px;
`;

export const Icon = styled.div`
  align-items: flex-start;
  display: inline-flex;
  flex: 0 0 auto;
  flex-direction: column;
  width: ${spacing * 4}px;
`;
